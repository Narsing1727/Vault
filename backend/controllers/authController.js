const pool = require('../db');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
exports.registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }
    
    const passwordHash = await bcrypt.hash(password, 10);


    await pool.query(
      `INSERT INTO users (email, password_hash)
       VALUES ($1, $2)`,
      [email, passwordHash]
    );

    res.status(201).json({ message: "User registered successfully" });

  } catch (err) {
    if (err.code === "23505") {
      return res.status(400).json({ message: "Email already exists" });
    }

    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    
    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = result.rows[0];

    
    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    
    const token = jwt.sign(
      { userId: user.id },
      "secret_key",
      { expiresIn: "1h" }
    );

    res.json({ token });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

