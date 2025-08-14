const express = require("express");
const app = express();
const rt = require("./src/routers/router");
const cors = require("cors");
const PORT = process.env.PORT || 8081;
const config = require("./src/config")
require("./src/SQL/connection");
require("dotenv").config();

const login = require("./src/Controller/login.controller")

app.use(cors(config.cors));
app.use(express.static('src'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.post("/register/seller", login.register)
app.post("/login/seller", login.login)
app.use(rt);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
