const express = require("express");
const DeleteUser = require("../controllers/user/DeleteUser");
const UserDetails = require("../controllers/user/UserDetails");
const { authenticateToken } = require("../middleware/auth");

const UserRoute = express.Router();

UserRoute.get("/", authenticateToken(), UserDetails);
UserRoute.delete("/delete", authenticateToken(), DeleteUser);

module.exports = UserRoute;
