const jwt = require("jsonwebtoken");

const logger = require("../../utils/logger");
const User = require("../../models/user");

/**
 * @type        DELETE
 * @route       /api/user/delete
 * @description Delete User Route.
 * @access      Private
 */
const DeleteUser = async (req, res) => {
    try {
        const userID = req.auth;

        const existingUser = await User.findByIdAndDelete(userID);

        if (!existingUser) {
            return res.status(401).json({
                message: "User not found. Please check credentials.",
            });
        }

        return res.status(200).json({
            message: "User deleted successfully",
        });
    } catch (error) {
        logger.error(error.message);

        return res.status(500).json({
            message: "Internal server error.",
        });
    }
};

module.exports = DeleteUser;
