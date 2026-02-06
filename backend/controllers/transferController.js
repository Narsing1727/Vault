const pool = require("../db");
exports.internalTransfer = async (req, res) => {
  const { fromAccount, toAccount, amount, reference } = req.body;

  if (amount <= 0)
    return res.status(400).json({ message: "Invalid amount" });

  const txId = `TX-${Date.now()}`;
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    await insertLedgerEntry({
      client,
      txId,
      accountId: fromAccount,
      amount: -amount,
      status: "PENDING",
      reference
    });

    await insertLedgerEntry({
      client,
      txId,
      accountId: toAccount,
      amount: amount,
      status: "PENDING",
      reference
    });

    await client.query("COMMIT");

    res.json({ message: "Transfer created", txId });

  } catch (err) {
    await client.query("ROLLBACK");
    console.error(err.message);
    res.status(500).json({ message: "Transfer failed" });
  } finally {
    client.release();
  }
};
