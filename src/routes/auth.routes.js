const express = require("express");
const UserSignIn = require("../controllers/auth/SignIn");
const UserSignUp = require("../controllers/auth/SignUp");
const { validateSignIn, validateSignUp } = require("../middleware/checkReq");

const AuthRoute = express.Router();

AuthRoute.post("/signin", validateSignIn, UserSignIn);
AuthRoute.post("/signup", validateSignUp, UserSignUp);

module.exports = AuthRoute;
