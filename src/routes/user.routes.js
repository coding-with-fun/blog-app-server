const express = require("express");
const UserDetails = require("../controllers/user/Details");
const { authenticateToken } = require("../middleware/auth");

const UserRoute = express.Router();

UserRoute.get("/", authenticateToken(), UserDetails);

module.exports = UserRoute;
