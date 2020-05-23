const express = require("express");

const homeHouter = require("./home");
const authRouter = require("./auth");
const usersRouter = require("./users");

var app = express();

app.use("/", homeHouter);
app.use("/login", authRouter);
app.use("/usuarios", usersRouter);

module.exports = app;
