const db = require("../SQL/connection")
const crypto = require('crypto')
const { Query } = require("../utils/sql.helper");


class favs {
    async add_fav(user_id, product_id) {
        try {
            const query = `INSERT INTO favourites (user_id, product_id) VALUES (?, ?)`;
            const result = await db.query(query, [user_id, product_id]);

            return result;
        } catch (error) {
            throw error
        }
    }
    async get_favs(user_id) {
        try {
            const query = `SELECT * FROM favourites WHERE user_id = ?`;
            const result = await db.query(query, [user_id]);

            return result[0]
        } catch (error) {
            throw error;
        }
    }

}

module.exports = new favs();