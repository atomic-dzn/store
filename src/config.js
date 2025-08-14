require("dotenv").config();

module.exports = {
    // MySQL database configuration
    db: {
        host: process.env.MYSQL_HOST || "161.97.137.120",
        user: process.env.MYSQL_USER || "foodify",
        password: process.env.MYSQL_PASSWORD || "Admin@1234",
        database: process.env.MYSQL_DATABASE || "mirza",
    },
    jwt: {
        access: {
            secret: process.env.JWT_ACCESS_SECRET,
            expiresIn: "15m",
        },

        refresh: {
            secret: process.env.JWT_REFRESH_SECRET,
            expiresIn: "30d",
        },
    },

}
