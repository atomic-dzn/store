const db = require("../SQL/connection")
const crypto = require('crypto')
const queryService = require("./query.service");

class ordered_items {
    async get_ordered(user_id) {
        try {
            const query = `SELECT * FROM orders WHERE user_id = ?`;
            const result = await db.query(query, [user_id]);

            return result[0]
        } catch (error) {
            throw error;
        }
    }
    async cancel_order(data) {
        try {
            const query1 = `UPDATE products SET quantity = quantity + ? WHERE product_id = ?`;
            const values1 = [data.quantity, data.product_id];
            const result1 = await queryService.dbQuery(query1, values1);

            const query2 = `UPDATE orders SET status = 'cancelled' WHERE order_id = ?`;
            const values2 = [data.order_id];
            const result2 = await queryService.dbQuery(query2, values2);

            return result1[0], result2[0];
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new ordered_items();