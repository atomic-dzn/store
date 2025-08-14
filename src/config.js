require("dotenv").config();

module.exports = {
    // MySQL database configuration
    db: {
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE
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
