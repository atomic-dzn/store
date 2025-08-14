const service = require('../Service/seller.service');

class products {
    async add_product(req, res) {
        try {
            await service.add_product(req.body)

            res.status(200).json({
                message: "item added successfully!",
                data: req.body,
            })
        } catch (error) {
            console.log(error)
            res.status(500).json({
                message: error.message || "something went wrong",
                error: req.body
            })
        }
    }
    async delete_product(req, res) {
    try {
      const data = await service.delete_product(req.params.product_id)

      res.status(200).json({
        message: "product deleted successfully",
        data: data,
      })
    } catch {
      res.status(500).json({
        message: "something went wrong",
        error: req.body
      })
    }
  }
}

module.exports = new products();
