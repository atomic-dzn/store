const db = require("../utils/sql.helper");
const crypto = require("crypto");
const jwt = require("./jwt.service");

class login {
    static async register(data) {
        try {
            const checkSql = "SELECT * FROM users WHERE username = ?";
            const existingUser = await db.Query(checkSql, [data.username]);

            if (existingUser.length > 0) {
                throw new Error("Username is already taken");
            }

            const id = crypto.randomBytes(4).toString("hex");
            data.user_id = id;
            data.password = await jwt.hashPassword(data.password);
     
            const sql = "INSERT INTO users SET ?";
            const result = await db.Query(sql, data);

            if (result?.affectedRows) {
                return "User is added";
            } else {
                throw new Error("User is not added");
            }
        } catch (err) {
            throw err;
        }
    }


    static async login({ username, password }) {
        try {
            const hashPassword = await jwt.hashPassword(password);
            const sql =
          "SELECT * FROM users WHERE username = ? AND password = ?";

        db.Query(sql, [username, hashPassword], async (err, result) => {
          if (err) reject(err);

          if (result?.length) {
            const users = result[0];
            const data = {
              user_id: users.user_id,
              username: users.username,
              password: users.password,
            };
            delete users.password;
            const token = await jwt.generateToken(data);

            return({ users, token });
          } else {
            throw new Error("Username or Password is incorrect");
          }
        });
      } catch (err) {
        throw  err;
      }
    }
}

module.exports = login;
