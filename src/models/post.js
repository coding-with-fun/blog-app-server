/**
 * @author Harsh Patel
 * @description Post model.
 */

const mongoose = require("mongoose");

const PostSchema = mongoose.Schema(
    {
        title: {
            type: String,
            trim: true,
            required: true,
        },

        content: {
            type: String,
            trim: true,
            required: true,
        },

        cleanContent: {
            type: String,
            trim: true,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Post", PostSchema);
