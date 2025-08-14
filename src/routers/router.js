const rt = require("express").Router();

const loginUser = require("../Controller/loginUsers.controller")
const order = require("../Controller/orders.controller")
const favs = require("../Controller/favs.controller");
const category = require("../Controller/category.controller")
const ordered = require("../Controller/getOrdered.controller")
const products = require("../Controller/seller.controller")

// get
rt.get("/get/favourites/:user_id", favs.get_favs);
rt.get("/get/:category", category.category)
rt.get("/get/ordered/:user_id", ordered.get_ordered)

// post
rt.post("/:user_id/:product_id", favs.add_fav);
rt.post("/register", loginUser.register)
rt.post("/login", loginUser.login)
rt.post("/order", order.receive)
rt.post("/add/product", products.add_product)
rt.post("/order", order.receive)
rt.post("/add/product", products.add_product)

// delete
rt.delete("/delete/product/:product_id", products.delete_product)
rt.delete("/cancel/order/:order_id", ordered.cancel_order)


module.exports = rt;