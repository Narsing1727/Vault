const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "vault_db",
  password: "newton1727",
  port: 5432,
});

module.exports = pool;
