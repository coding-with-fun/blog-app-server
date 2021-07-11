const jwt = require("jsonwebtoken");

const logger = require("../../utils/logger");
const User = require("../../models/user");

/**
 * @type        GET
 * @route       /api/user
 * @description User Details Route.
 * @access      Private
 */
const UserDetails = async (req, res) => {
    try {
        const userID = req.auth;

        const user = await User.findById(userID)
            .populate(
                "postsList",
                "_id title content cleanContent createdAt updatedAt"
            )
            .select({
                encryptedPassword: 0,
                salt: 0,
            });

        if (!user) {
            return res.status(401).json({
                message: "User not found. Please check credentials.",
            });
        }

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
            message: "Fetched user details successfully",
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
