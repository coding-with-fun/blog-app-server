const jwt = require("jsonwebtoken");

const logger = require("../../utils/logger");
const User = require("../../models/user");
const Post = require("../../models/post");

/**
 * @type        POST
 * @route       /api/post/create
 * @description Add new post Route.
 * @access      Private
 */
const CreatePost = async (req, res) => {
    try {
        const userID = req.auth;
        const { title, content, cleanContent } = req.body;

        const options = {
            new: true,
        };

        const newPost = new Post({
            title,
            content,
            cleanContent,
        });
        await newPost.save();

        const user = await User.findByIdAndUpdate(
            userID,
            {
                postsList: newPost._id,
            },
            options
        ).select({
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
            message: "New post added.",
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

module.exports = CreatePost;
