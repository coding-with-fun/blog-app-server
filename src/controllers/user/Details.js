const jwt = require("jsonwebtoken");

const logger = require("../../utils/logger");
const User = require("../../models/user");

/**
 * @type        GET
 * @route       /api/user
 * @description User Details Route.
 * @access      Public
 */
const UserDetails = async (req, res) => {
    try {
        const userID = req.auth;

        let user = await User.findById(userID);

        user = user.toJSON();
        delete user.salt;
        delete user.encryptedPassword;

        const token = jwt.sign(
            {
                _id: user._id,
            },
            process.env.SECRET,
            {
                expiresIn: "24hr",
            }
        );

        return res.status(200).json({
            message: "User signed in successfully",
            data: {
                token,
                user,
            },
        });
    } catch (error) {
        logger.error(error.message);

        return res.status(500).json({
            message: "Internal server error.",
        });
    }
};

module.exports = UserDetails;
