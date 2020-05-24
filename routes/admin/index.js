const express = require("express");

const homeHouter = require("./home");
const authRouter = require("./auth");
const usersRouter = require("./users");
const productsRouter = require("./products");

var app = express();

app.use("/", homeHouter);
app.use("/login", authRouter);
app.use("/usuarios", usersRouter);
app.use("/produtos", productsRouter);

module.exports = app;
