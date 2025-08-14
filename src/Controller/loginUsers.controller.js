const validation = require("../validation/login.validation");
const service = require("../Service/loginUsers.service");

class loginUsers {
    // register a new user PATH: /api/user/register METHOD: POST (Public)
    async register(req, res) {
        try {
            const error = await validation.register(req.body);

            if (error) {
                res.status(400).json({
                    message: "Validation Error",
                    error: error.message || error,
                });
            } else {
                await service.register(req.body);
                res.status(201).json({
                    message: "User is added successfully",
                    data: req.body,
                });
            }
        } catch (err) {
            res.status(500).json({
                message: "Server error",
                error: err.message || err,
            });
        }
    }

    // login a user PATH: /api/user/login METHOD: POST (Public)
    async login(req, res) {
        try {
            const users = await service.login(req.body);

            res.status(200).json({
                message: "You have logged in successfully",
                innerData: {
                    users,
                },
            });
        } catch (err) {
            res.status(500).json({
                error: err.message || err,
            });
        }
    }
}

module.exports = new loginUsers();
