const service = require("../Service/category.service")

class category {
    async category(req, res) {
        try {
          const data = await service.get(req.params.category)
    
          res.status(200).json({
            data: data,
          })
        } catch (error) {
          res.status(500).json({
            message: "failed to get favourite products",
            error: error.message
          })
        }
      }
}

module.exports = new category();