const pool = require("../db");

exports.getOrganization = async (req, res) => {
  const userId = req.user.id;

  const { rows } = await pool.query(
    `SELECT company_name, tax_id
     FROM organizations
     WHERE owner_user_id = $1`,
    [userId]
  );

  res.json(rows[0] || {});
};
exports.updateOrganization = async (req, res) => {
  const userId = req.user.id;
  const { companyName, taxId } = req.body;

  await pool.query(
    `INSERT INTO organizations (owner_user_id, company_name, tax_id)
     VALUES ($1,$2,$3)
     ON CONFLICT (owner_user_id)
     DO UPDATE SET
       company_name = EXCLUDED.company_name,
       tax_id = EXCLUDED.tax_id,
       updated_at = NOW()`,
    [userId, companyName, taxId]
  );

  res.json({ success: true });
};
exports.listApiKeys = async (req, res) => {
  const userId = req.user.id;

  const { rows } = await pool.query(
    `SELECT id, last_four, created_at, revoked
     FROM api_keys
     WHERE user_id = $1`,
    [userId]
  );

  res.json(rows);
};
const crypto = require("crypto");

exports.generateApiKey = async (req, res) => {
  const userId = req.user.id;

  const rawKey = "sk_live_" + crypto.randomBytes(32).toString("hex");
  const hash = crypto.createHash("sha256").update(rawKey).digest("hex");
  const lastFour = rawKey.slice(-4);

  await pool.query(
    `INSERT INTO api_keys (user_id, key_hash, last_four)
     VALUES ($1,$2,$3)`,
    [userId, hash, lastFour]
  );

  res.json({ apiKey: rawKey });
};
exports.revokeApiKey = async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;

  await pool.query(
    `UPDATE api_keys
     SET revoked = true
     WHERE id = $1 AND user_id = $2`,
    [id, userId]
  );

  res.json({ revoked: true });
};
