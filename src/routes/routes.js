const express = require("express");
const AuthRoute = require("./auth.routes");
const PostRoute = require("./post.routes");
const UserRoute = require("./user.routes");

const app = express();

app.use("/auth", AuthRoute);
app.use("/user", UserRoute);
app.use("/post", PostRoute);

module.exports = app;
