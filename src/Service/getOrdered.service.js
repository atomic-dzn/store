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
            const findItem = `SELECT product_id, quantity FROM orders WHERE order_id = ?`;
            const result1 = await queryService.dbQuery(findItem, [data.order_id]);

            for (const item of result1) {
                const updateProductQuery = `UPDATE products SET quantity = quantity + ? WHERE product_id = ?`;
                await queryService.dbQuery(updateProductQuery, [item.quantity, item.product_id]);
            }
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