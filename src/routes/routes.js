const express = require("express");
const AuthRoute = require("./auth.routes");

const app = express();

app.use("/auth", AuthRoute);

module.exports = app;
