const express = require("express");
const AuthRoute = require("./auth.routes");
const UserRoute = require("./user.routes");

const app = express();

app.use("/auth", AuthRoute);
app.use("/user", UserRoute);

module.exports = app;
