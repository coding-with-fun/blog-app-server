const jwt = require("jsonwebtoken");

const logger = require("../../utils/logger");
const User = require("../../models/user");

/**
 * @type        POST
 * @route       /api/auth/signin
 * @description Sign In Route.
 * @access      Public
 */
const UserSignIn = async (req, res) => {
    try {
        const { email, password } = req.body;

        let existingUser = await User.findOne({
            email,
        }).populate(
            "postsList",
            "_id title content cleanContent createdAt updatedAt"
        );

        if (!existingUser || !existingUser.authenticate(password)) {
            return res.status(401).json({
                message: "User not found. Please check credentials.",
            });
        }

        existingUser = existingUser.toJSON();
        delete existingUser.salt;
        delete existingUser.encryptedPassword;

        const token = jwt.sign(
            {
                _id: existingUser._id,
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
                user: existingUser,
            },
        });
    } catch (error) {
        logger.error(error.message);

        return res.status(500).json({
            message: "Internal server error.",
        });
    }
};

module.exports = UserSignIn;
