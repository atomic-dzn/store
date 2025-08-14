const db = require("../SQL/connection");

class queryService {
static async dbQuery(query, values) {
  console.log("Running SQL:", query, values);
  try {
    const result = await db.query(query, values);
    console.log("Query executed successfully");
    return result[0]; // mysql2 promise returns [rows, fields]
  } catch (err) {
    console.log("Query error:", err);
    throw err;
  }
}


  static dbQuery1(conn, query, values) {
    return new Promise((resolve, reject) => {
      conn.query(query, values, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  static async transaction() {
    const getConnection = async () => {   
      return new Promise((resolve, reject) => {
        db.getConnection((err, conn) => {
          if (err) return reject(err);
          resolve(conn);
        });
      });
    };

    const beginTransaction = async (conn) => {
      return new Promise((resolve, reject) => {
        conn.beginTransaction((err) => {
          if (err) return reject(err);
          resolve(true);
        });
      });
    };

    const commit = async (conn) => {
      return new Promise((resolve, reject) => {
        conn.commit((err) => {
          if (err) return reject(err);
          resolve(true);
        });
      });
    };

    const rollback = async (conn) => {
      return new Promise((resolve) => {
        conn.rollback(() => {
          resolve(true);
        });
      });
    };

    const release = async (conn) => {
      return new Promise((resolve) => {
        conn.release();
        resolve(true);
      });
    };

    const conn = await getConnection();
    await beginTransaction(conn);

    return { conn, commit, rollback, release };
  }

  static async reconnect() {
    return new Promise((resolve, reject) => {
      db.getConnection((err, conn) => {
        if (err) return reject(err);
        conn.release();
        resolve(true);
      });
    });
  }
}

module.exports = queryService;
