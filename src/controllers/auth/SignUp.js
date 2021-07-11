const jwt = require("jsonwebtoken");

const logger = require("../../utils/logger");
const User = require("../../models/user");

/**
 * @type        POST
 * @route       /api/auth/signup
 * @description Sign Up Route.
 * @access      Public
 */
const UserSignUp = async (req, res) => {
    try {
        const { username, name, email, password } = req.body;

        const existingUser = await User.findOne({
            $or: [
                {
                    email,
                },
                {
                    username,
                },
            ],
        });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists.",
            });
        }

        let newUser = new User({
            username,
            name,
            email,
            password,
        });
        await newUser.save();

        newUser = newUser.toJSON();
        delete newUser.salt;
        delete newUser.encryptedPassword;

        const token = jwt.sign(
            {
                _id: newUser._id,
            },
            process.env.SECRET,
            {
                expiresIn: "24hr",
            }
        );

        return res.status(200).json({
            message: "User signed up successfully",
            data: {
                token,
                user: newUser,
            },
        });
    } catch (error) {
        logger.error(error.message);

        return res.status(500).json({
            message: "Internal server error.",
        });
    }
};

module.exports = UserSignUp;
