const express = require("express");
const DeleteUser = require("../controllers/user/Delete");
const UserDetails = require("../controllers/user/Details");
const { authenticateToken } = require("../middleware/auth");

const UserRoute = express.Router();

UserRoute.get("/", authenticateToken(), UserDetails);
UserRoute.delete("/delete", authenticateToken(), DeleteUser);

module.exports = UserRoute;
