const db = require("../SQL/connection")
const crypto = require('crypto')
const { Query } = require("../utils/sql.helper");

class category {
    async get(category) {
        try {
            const query = `SELECT * FROM products WHERE category = ?`;
            const result = await db.query(query, [category]);
            console.log(result[0]);
            
            return result[0];
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new category();        