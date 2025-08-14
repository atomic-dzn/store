const db = require("../SQL/connection")
const crypto = require('crypto')
const { Query } = require("../utils/sql.helper");

class products {
  async add_product(data) {
    try {
      data.product_id = crypto.randomBytes(4).toString('hex');
      const query = `INSERT INTO products SET ?`;
      const result = await Query(query, [data]);

      if (!data.category) {
        throw new Error("Please select a category");
      }

      if (!result?.affectedRows) {
        throw new Error("Failed to Add New product")
      }

      return result;
    } catch (err) {
      throw (err)
    }
  }
  async delete_product(task_id) {
    try {
      const query = `DELETE FROM products WHERE product_id = ?`;
      const result = await Query(query, task_id);

      if (!result?.affectedRows) {
        return "there is no product in this ID"
      }
    } catch (error) {
      throw error
    }
  }
}

module.exports = new products()
