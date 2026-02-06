const speakeasy = require("speakeasy");

const pool = require("../db");
const bcrypt = require("bcrypt");
exports.getProfile = async (req, res) => {
  const userId = req.user.id;

  try {
    const { rows } = await pool.query(
      `
      SELECT
        first_name,
        last_name,
        email,
        phone
      FROM users
      WHERE id = $1
      `,
      [userId]
    );

    if (!rows.length) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(rows[0]);

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Failed to fetch profile" });
  }
};
exports.updateProfile = async (req, res) => {
  const userId = req.user.id;
  const { firstName, lastName, phone } = req.body;

  try {
    await pool.query(
      `
      UPDATE users
      SET
        first_name = $1,
        last_name = $2,
        phone = $3
      WHERE id = $4
      `,
      [firstName, lastName, phone, userId]
    );

    return res.status(200).json({
      message: "Profile updated successfully"
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Profile update failed" });
  }
};
exports.getCurrentPlan = async (req, res) => {
  const userId = req.user.id;

  const { rows } = await pool.query(
    `SELECT plan, price, interval, next_billing_date
     FROM subscriptions
     WHERE user_id = $1`,
    [userId]
  );

  res.json(rows[0]);
};
exports.changePlan = async (req, res) => {
  const userId = req.user.id;
  const { plan } = req.body;

  await pool.query(
    `UPDATE subscriptions
     SET plan = $1
     WHERE user_id = $2`,
    [plan, userId]
  );

  res.json({ message: "Plan updated" });
};
exports.cancelSubscription = async (req, res) => {
  const userId = req.user.id;

  await pool.query(
    `UPDATE subscriptions
     SET cancelled_at = NOW()
     WHERE user_id = $1`,
    [userId]
  );

  res.json({
    message: "Subscription will end at billing cycle"
  });
};
exports.getPaymentMethod = async (req, res) => {
  const userId = req.user.id;

  const { rows } = await pool.query(
    `SELECT brand, last4, expiry
     FROM payment_methods
     WHERE user_id = $1`,
    [userId]
  );

  res.json(rows[0]);
};


exports.changePassword = async (req, res) => {
  const userId = req.user.id;
  const { currentPassword, newPassword, confirmPassword } = req.body;

  if (newPassword !== confirmPassword)
    return res.status(400).json({ message: "Passwords do not match" });

  const { rows } = await pool.query(
    "SELECT password_hash FROM users WHERE id = $1",
    [userId]
  );

  const valid = await bcrypt.compare(currentPassword, rows[0].password_hash);
  if (!valid)
    return res.status(401).json({ message: "Incorrect current password" });

  const hash = await bcrypt.hash(newPassword, 12);

  await pool.query(
    `UPDATE users
     SET password_hash=$1, password_updated_at=NOW()
     WHERE id=$2`,
    [hash, userId]
  );

  res.json({ message: "Password updated successfully" });
};


exports.setup2FA = async (req, res) => {
  const userId = req.user.id;

  const secret = speakeasy.generateSecret({ length: 20 });

  await pool.query(
    `UPDATE users
     SET twofa_secret=$1, twofa_verified=false
     WHERE id=$2`,
    [secret.base32, userId]
  );

  res.json({
    otpauth_url: secret.otpauth_url,
    base32: secret.base32
  });
};
exports.verify2FA = async (req, res) => {
  const userId = req.user.id;
  const { token } = req.body;

  const { rows } = await pool.query(
    "SELECT twofa_secret FROM users WHERE id=$1",
    [userId]
  );

  const verified = speakeasy.totp.verify({
    secret: rows[0].twofa_secret,
    encoding: "base32",
    token,
    window: 1
  });

  if (!verified)
    return res.status(400).json({ message: "Invalid 2FA code" });

  await pool.query(
    `UPDATE users
     SET is_2fa_enabled=true, twofa_verified=true
     WHERE id=$1`,
    [userId]
  );

  res.json({ message: "2FA enabled successfully" });
};
exports.deleteAccount = async (req, res) => {
  const userId = req.user.id;

  await pool.query(`DELETE FROM users WHERE id = $1`, [userId]);

  res.json({ deleted: true });
};
