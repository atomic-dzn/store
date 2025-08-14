const service = require("../Service/login.service");

class Login {
    async register(req, res) {
        try {
            await service.register(req.body);
            res.status(201).json({
                message: "Seller added successfully",
                data: req.body,
            });
        } catch (err) {
            const statusCode = err.status || 500;
            res.status(statusCode).json({
                message: err.message || "Server error",
            });
        }
    }

    // login a user PATH: /api/user/login METHOD: POST (Public)
    async login(req, res) {
        try {
            const users = await service.login(req.body);
            res.status(200).json({
                message: "You have logged in successfully",
                innerData: { users },
            });
        } catch (err) {
            res.status(500).json({
                message: "Internal Server Error",
                error: req.body,
            });
        }
    }
}

module.exports = new Login();
