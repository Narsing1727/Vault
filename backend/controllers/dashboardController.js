const pool = require("../db");

exports.getSummary =async (req , res) => {
 
    try {
        const daily = await pool.query(
            `SELECT COALESCE(SUM(amount), 0) AS daily_delta
FROM ledger_entries
WHERE status = 'COMPLETED'
  AND account_id != 'SYSTEM'
  AND DATE(created_at) = CURRENT_DATE;

`
        );
        const monthly = await pool.query(
            `SELECT COALESCE(SUM(amount), 0) AS monthly_delta
FROM ledger_entries
WHERE status = 'COMPLETED'
  AND account_id != 'SYSTEM'
  AND DATE_TRUNC('month', created_at)
      = DATE_TRUNC('month', CURRENT_DATE);

`
        );

        const total = await pool.query(
            `SELECT COALESCE(SUM(amount), 0) AS total_balance
FROM ledger_entries
WHERE status = 'COMPLETED'
  AND account_id != 'SYSTEM';


            `
        );

        return res.status(200).json({
             total_balance: Number(total.rows[0].total_balance),
      daily_delta: Number(daily.rows[0].daily_delta),
      monthly_delta: Number(monthly.rows[0].monthly_delta)

        })
    } catch (error) {
        console.log(error.message);
        
    }
}

exports.balanceHistory = async (req , res) => {
    try {
       const data = await pool.query(
        `SELECT
  DATE(created_at) AS day,
  SUM(amount) AS balance
FROM ledger_entries
WHERE account_id != 'SYSTEM'
AND status = 'COMPLETED'
AND created_at >= NOW() - INTERVAL '1 month'
GROUP BY day
ORDER BY day ASC;
`
       ) ;

       return res.status(200).json({
        history : data.rows
       })
    } catch (error) {
        console.log(error.message);
        
    }
}
exports.recentTransactions = async(req , res) => {
    try {
        const recent = await pool.query(`
            SELECT
  tx_id,
  account_id,
  amount,
  reference,
  status,
  created_at
FROM ledger_entries
WHERE account_id != 'SYSTEM'
AND status = 'COMPLETED'
ORDER BY created_at DESC
LIMIT 5;

            `);

                return res.status(200).json({
        recentTrans : recent.rows,
       })
    } catch (error) {
        console.log(error.message);
        
    }
}

exports.accountBalances = async (req , res) => {
    try {
        const balances = await pool.query(`
            SELECT
  account_id,
  SUM(amount) AS balance
FROM ledger_entries
WHERE account_id != 'SYSTEM'
AND status = 'COMPLETED'
GROUP BY account_id;
`);
console.log(balances);
if (!balances.rows.length) {
  res.json({ message: "No data" });
}
return res.status(200).json({
    accountBalances : balances.rows,
});
    } catch (error) {
        console.log(error.message);
        
    }
}

exports.accountList = async (req , res) => {
    try {
        const accounts =  await pool.query(`
            SELECT DISTINCT account_id
FROM ledger_entries
WHERE account_id != 'SYSTEM';
`);
return res.status(200).json({
    accountList : accounts.rows,
})
    } catch (error) {
        console.log(error.message);
        
    }
}
exports.singleAccountBalance =async (req , res) => {
    const {accountId} = req.params;
 try {
   
     const { rows } = await pool.query(
      `
      SELECT COALESCE(SUM(amount), 0) AS balance
      FROM ledger_entries
      WHERE account_id = $1
      AND status = 'COMPLETED'
      `,
      [accountId]
    );

    return res.status(200).json({
      accountId,
      balance: Number(rows[0].balance)
    });
 } catch (error) {
    console.log(error.message);
    
 }
}


exports.reviewTransfer = async (req, res) => {
  const { fromAccount, toAccount, amount } = req.body;

  if (!fromAccount || !toAccount) {
    return res.status(400).json({ message: "Accounts required" });
  }

  if (fromAccount === toAccount) {
    return res.status(400).json({ message: "Source and destination must differ" });
  }

  if (amount <= 0) {
    return res.status(400).json({ message: "Invalid amount" });
  }

  try {
    const { rows } = await pool.query(
      `
      SELECT COALESCE(SUM(amount), 0) AS balance
      FROM ledger_entries
      WHERE account_id = $1
      AND status = 'COMPLETED'
      `,
      [fromAccount]
    );

    const balance = Number(rows[0].balance);

    if (amount > balance) {
      return res.status(400).json({
        valid: false,
        reason: "Insufficient funds",
        balance
      });
    }

    return res.status(200).json({
      valid: true,
      fromAccount,
      toAccount,
      amount,
      balanceAfter: balance - amount
    });

  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ message: "Transfer review failed" });
  }
};
