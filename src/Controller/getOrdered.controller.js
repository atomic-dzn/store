const service = require("../Service/getOrdered.service")

class ordered_items {
  async get_ordered(req, res) {
    try {
      const data = await service.get_ordered(req.params.user_id)

      res.status(200).json({
        message: "here is your ordered products!",
        data: data,
      })
    } catch (error) {
      res.status(500).json({
        message: "failed to get favourite products",
        error: error.message
      })
    }
  }
  async cancel_order(req, res) {
    try {
      const data = { order_id: req.params.order_id };
      const result = await service.cancel_order(data);

      res.status(200).json({
        message: "order canceled successfully",
        data: result
      });
    } catch (error) {
      res.status(500).json({
        message: "failed to cancel",
        error: error.message
      });
    }
  }

}

module.exports = new ordered_items();