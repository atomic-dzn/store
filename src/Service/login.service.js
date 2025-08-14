const db = require("../utils/sql.helper");
const crypto = require("crypto");
const jwt = require("./jwt.service");

class login {
    static async register(data) {
        try {
            const checkSql = "SELECT * FROM sellers WHERE email = ?";
            const existingEmail = await db.Query(checkSql, [data.email]);

            if (existingEmail.length > 0) {
                throw new Error("Email is already used");
            }

            const id = crypto.randomBytes(4).toString("hex");
            data.id = id;
            data.password = await jwt.hashPassword(data.password);

            const sql = "INSERT INTO sellers (name, email, password, phone) VALUES (?, ?, ?, ?)";
            const result = await db.Query(sql, [data.name, data.email, data.password, data.phone]);

            if (result?.affectedRows) {
                return "seller is added";
            } else {
                throw new Error("seller is not added");
            }
        } catch (err) {
            throw err;
        }
    }




    static async login({ email, password }) {
        try {
            const hashPassword = await jwt.hashPassword(password);
            const sql =
                "SELECT * FROM sellers WHERE email = ? AND password = ?";

            db.Query(sql, [email, hashPassword], async (err, result) => {
                if (err) reject(err);

                if (result?.length) {
                    const seller = result[0];
                    const data = {
                        seller_id: seller.seller_id,
                        email: seller.email,
                        password: seller.password,
                    };
                    delete seller.password;
                    const token = await jwt.generateToken(data);

                    resolve({ seller, token });
                } else {
                    reject("email or Password is incorrect");
                }
            });
        } catch (err) {
            reject(err);
        }
    }
}

module.exports = login;