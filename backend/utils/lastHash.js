const { computeHash } = require("../utils/crypto");
async function getLastHashOnce(client) {
  const res = await client.query(
    `SELECT curr_hash
     FROM ledger_entries
     ORDER BY seq DESC
     LIMIT 1
     FOR UPDATE`
  );

  return res.rows.length === 0
    ? "GENESIS"
    : res.rows[0].curr_hash;
}

// async function getLastHash(client) {
//   const res = await client.query(
//     `SELECT curr_hash
//      FROM ledger_entries
//      ORDER BY id DESC
//      LIMIT 1
//      FOR UPDATE`
//   );

//   return res.rows[0]?.curr_hash || "GENESIS";
// }

async function insertLedgerEntry({
  client,
  txId,
  accountId,
  amount,
  status,
  reference,
  prevHash
}) {
  const hashData =
    `${prevHash}${txId}${accountId}${amount}${status}`;

  const currHash = computeHash(hashData);

  await client.query(
    `INSERT INTO ledger_entries
     (tx_id, account_id, amount, status, reference, prev_hash, curr_hash)
     VALUES ($1,$2,$3,$4,$5,$6,$7)`,
    [txId, accountId, amount, status, reference, prevHash, currHash]
  );

  return currHash; 
}
module.exports = { getLastHashOnce , insertLedgerEntry };
