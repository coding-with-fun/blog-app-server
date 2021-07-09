const express = require("express");
const UserSignIn = require("../controllers/auth/SignIn");

const AuthRoute = express.Router();

AuthRoute.post("/signin", UserSignIn);

module.exports = AuthRoute;
