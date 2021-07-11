const express = require("express");
const CreatePost = require("../controllers/post/CreatePost");
const { authenticateToken } = require("../middleware/auth");
const { validateNewPost } = require("../middleware/checkReq");

const PostRoute = express.Router();

PostRoute.post("/create", authenticateToken(), validateNewPost, CreatePost);

module.exports = PostRoute;
