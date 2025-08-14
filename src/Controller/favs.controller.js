const service = require("../Service/favs.service")

class favs {
  async add_fav(req, res) {
    try {
      const { user_id, product_id } = req.params;
      await service.add_fav(user_id, product_id);

      res.status(201).json({
        message: "added to favourites",
        data: req.body,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "something went wrong",
        error: error,
      });
    }
  }
  async get_favs(req, res) {
    try {
      const data = await service.get_favs(req.params.user_id)

      res.status(200).json({
        message: "here is your favourite products!",
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

module.exports = new favs();