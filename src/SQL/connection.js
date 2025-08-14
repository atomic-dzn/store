// config/connection.js
const mysql = require("mysql2");
const config = require("../config")

const pool = mysql.createPool({
  host: config.db.host || "161.97.137.120",
  user: config.db.user || "foodify",
  password: config.db.password || "Admin@1234",
  database: config.db.database || "mirza",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error("❌ Error connecting to MySQL:", err.message, err.code);
  } else {
    console.log("✅ Connected to MySQL database!");
    connection.release();
  }
});

module.exports = pool.promise();
