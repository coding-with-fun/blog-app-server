const logger = require("../../utils/logger");
const User = require("../../models/user");

/**
 * @type        POST
 * @route       /auth/signin
 * @description Sign In Route.
 * @access      Public
 */
const UserSignIn = async (req, res) => {
    try {
        const { name, username, email, password } = req.body;

        const newUser = new User({
            name,
            username,
            email,
            password,
        });
        await newUser.save();

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
