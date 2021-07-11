const jwt = require("express-jwt");
const logger = require("../utils/logger");

exports.authenticateToken = () => {
    return [
        jwt({
            secret: process.env.SECRET,
            algorithms: ["HS256"],
            userProperty: "auth",
            getToken: function getJWT(req) {
                let token = req.header("x-auth-token");

                if (token) {
                    token = token.split(" ");
                    if (token[0] === "Bearer") {
                        return token[1];
                    }
                }
            },
        }),
        (err, req, res, next) => {
            logger.error("Invalid token received.");
            return res.status(err.status).json({
                message: err.inner.message,
            });
        },
    ];
};
