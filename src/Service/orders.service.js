const queryService = require("./query.service");
const crypto = require("crypto");

class order {
    async received_order(data) {
        try {
            const order_id = crypto.randomBytes(3).toString('hex');
            let total_price = 0;
            for (const item of data.items) {
                total_price += item.quantity * item.price;

                const orderData = {
                    order_id,
                    product_id: item.product_id,
                    quantity: item.quantity,
                    price: item.price,
                    total_price: item.quantity * item.price,
                    user_id: data.user_id 
                };

                const sql = `INSERT INTO orders SET ?`;
                const result = await queryService.dbQuery(sql, [orderData]);

                if (!result?.affectedRows) {
                    throw new Error("Failed to receive order");
                }

                const sql1 = `UPDATE products SET quantity = quantity - ? WHERE product_id = ?`;
                const values1 = [item.quantity, item.product_id];
                await queryService.dbQuery(sql1, values1);
            }

            return `Order placed successfully. Total price: ${total_price}`;
        } catch (err) {
            throw err;
        }
    }
}


module.exports = new order();
