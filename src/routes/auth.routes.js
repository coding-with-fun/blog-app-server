const express = require("express");
const UserSignIn = require("../controllers/auth/SignIn");
const { validateSignIn } = require("../middleware/checkReq");

const AuthRoute = express.Router();

AuthRoute.post("/signin", validateSignIn, UserSignIn);

module.exports = AuthRoute;
