const pool = require("../db");
const { computeHash } = require("../utils/crypto");
const {insertLedgerEntry, getLastHashOnce} = require("../utils/lastHash");
exports.completeTransaction = async (req, res) => {
    console.log("strt");
    
  const { txId } = req.params;
  const client = await pool.connect();
console.log(txId);

  try {
    await client.query("BEGIN");

    const { rows } = await client.query(
      `SELECT account_id, amount
       FROM ledger_entries
       WHERE tx_id = $1 AND status = 'PENDING'`,
      [txId]
    );
console.log("after pending fetch", rows);
    if (rows.length === 0) {
      await client.query("ROLLBACK");
      return res.status(400).json({ message: "Invalid or already completed tx" });
    }

    const debitEntry = rows.find(r => Number(r.amount) < 0);

    if (!debitEntry){
      await client.query("ROLLBACK");
      return res.status(400).json({ message: "Invalid ledger structure" });
    }

    const fromAccount = debitEntry.account_id;
    const transferAmt = Math.abs(Number(debitEntry.amount));
// console.log("fromaccount" , fromAccount);
// console.log( "transferamt" , transferAmt);

await client.query(
  `SELECT 1
   FROM ledger_entries
   WHERE account_id = $1
   AND status = 'COMPLETED'
   FOR UPDATE`,
  [fromAccount]
);

const balanceRes = await client.query(
  `SELECT COALESCE(SUM(amount),0) AS balance
   FROM ledger_entries
   WHERE account_id = $1
   AND status = 'COMPLETED'`,
  [fromAccount]
);

const balance = Number(balanceRes.rows[0].balance);
// console.log("balance", balance);


    const newStatus = transferAmt > balance ? "FAILED" : "COMPLETED";

    await client.query(
      `UPDATE ledger_entries
       SET status = $2
       WHERE tx_id = $1 AND status = 'PENDING'`,
      [txId, newStatus]
    );

    await client.query("COMMIT");

    res.json({ message: `Transaction ${newStatus}`, txId });

  } catch (err) {
    await client.query("ROLLBACK");
     console.error("ERROR OCCURRED 👇");
  console.error(err.message);
  console.error(err.stack);
    res.status(500).json({ message: "Completion failed" });
  } finally {
    client.release();
  }
};
exports.fundAccount = async (req, res) => {
  const { accountId } = req.params;
  const { amount, reference } = req.body;

  if (amount <= 0) {
    return res.status(400).json({ message: "Amount must be positive" });
  }

  const client = await pool.connect();

  try {  await client.query("BEGIN");

    const txId = `TX-${Date.now()}`;

    // 🔒 get ledger head ONCE
    let prevHash = await getLastHashOnce(client);
const amountPaise = amount * 100;
    // SYSTEM debit
    prevHash = await insertLedgerEntry({
      client,
      txId,
      accountId: "SYSTEM",
      amount: -amountPaise,
      status: "COMPLETED",
      reference,
      prevHash
    });

    // USER credit
    prevHash = await insertLedgerEntry({
      client,
      txId,
      accountId,
      amount: amountPaise,
      status: "COMPLETED",
      reference,
      prevHash
    });

    await client.query("COMMIT");


    res.json({ message: "Account funded", txId });

  } catch (err) {
    await client.query("ROLLBACK");
    console.error(err.message);
    res.status(500).json({ message: "Funding failed" });
  } finally {
    client.release();
  }
};

exports.verifyTransactionInvariant = async (req, res) => {
  const { txId } = req.params;

  try {
    const { rows } = await pool.query(
      `SELECT COALESCE(SUM(amount), 0) AS total
       FROM ledger_entries
       WHERE tx_id = $1`,
      [txId]
    );

    const total = Number(rows[0].total);

    if (total !== 0) {
      return res.status(400).json({
        txId,
        valid: false,
        reason: "Invariant violated: sum(amount) != 0",
        total
      });
    }

    res.json({
      txId,
      valid: true,
      total
    });

  } catch (err) {
    res.status(500).json({ message: "Invariant check failed" });
  }
};
exports.verifyGlobal = async (req , res) => {
    try {
        const {rows } = await pool.query(
            `SELECT tx_id, SUM(amount) AS total
FROM ledger_entries
GROUP BY tx_id
HAVING SUM(amount) != 0`

        )
        if(rows.length > 0){
            return res.json(400).json({
                status : "failed",
                brokenTransactions : rows
            });

           

        }
         return res.status(200).json({
                status : "Success",
                message : "No transaction is broken",
            });
    } catch (error) {
         res.status(500).json({ message: "Global invariant check failed" });
    }
}


exports.verifyLedgerChain = async (req, res) => {
  try {
 const { rows } = await pool.query(
  `SELECT
     seq,
     tx_id,
     account_id,
     amount,
     status,
     prev_hash,
     curr_hash
   FROM ledger_entries
   ORDER BY seq ASC`
);

let lastHash = "GENESIS";

for (const row of rows) {

  if (row.prev_hash !== lastHash) {
    return res.status(400).json({
      valid: false,
      reason: "prev_hash mismatch",
      brokenAt: {
        seq: row.seq,
        txId: row.tx_id,
        expectedPrev: lastHash,
        actualPrev: row.prev_hash
      }
    });
  }

  const expectedHash = computeHash(
    `${row.prev_hash}${row.tx_id}${row.account_id}${row.amount}${row.status}`
  );

  if (expectedHash !== row.curr_hash) {
    return res.status(400).json({
      valid: false,
      reason: "curr_hash mismatch",
      brokenAt: {
        seq: row.seq,
        txId: row.tx_id
      }
    });
  }

  lastHash = row.curr_hash;
}


    res.json({ valid: true });

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Ledger verification failed" });
  }
};
