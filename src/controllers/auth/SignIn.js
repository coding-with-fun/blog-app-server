const logger = require("../../utils/logger");

/**
 * @type        POST
 * @route       /auth/signin
 * @description Sign In Route.
 * @access      Public
 */
const UserSignIn = async (req, res) => {
    try {
        return res.status(200).json({
            message: "User signed in successfully",
        });
    } catch (error) {
        logger.error(error.message);

        return res.status(500).json({
            message: "Internal server error.",
        });
    }
};

module.exports = UserSignIn;
