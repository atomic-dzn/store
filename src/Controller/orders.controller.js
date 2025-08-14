const service = require("../Service/orders.service");

class order {
    async receive(req, res) {
        try {
            const result = await service.received_order({ ...req.body });

            res.status(201).json({
                message: "item(s) have been ordered",
                data: req.body,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: "something went wrong",
                error: error.message,
            });
        }
    }
}

module.exports = new order();