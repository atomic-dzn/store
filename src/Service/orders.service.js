const queryService = require("./query.service");
const crypto = require("crypto");

class order {
    async received_order(data) {
        try {
            data.order_id = crypto.randomBytes(3).toString('hex');
            data.total_price = data.quantity * data.price;

            const sql = `INSERT INTO orders SET ?`;
            const result = await queryService.dbQuery(sql, [data]);

            const sql1 = `UPDATE products SET quantity = quantity - ? WHERE product_id = ?`;
            const values1 = [data.quantity, data.product_id];
            const result1 = await queryService.dbQuery(sql1, values1);


            if (!result?.affectedRows) {
                throw new Error("Failed to receive order");
            }
            return "item(s) have been ordered successfully.";
        } catch (err) {
            throw err;
        }
    }
}


module.exports = new order();
