var express = require("express");
var bcrypt = require("bcryptjs");
var connection = require("../../database/connection");
var jwt = require("jsonwebtoken");

const authConfig = require("../../config/auth.json");

var router = express.Router();

router.get("/", function (req, res) {
  res.render("admin/login", {
    layout: "admin/login",
    error: req.flash("error"),
  });
});

router.post("/authenticate", async function (req, res) {
  const { email, password } = req.body;

  const user = await connection("users").where({ email }).first();

  if (!user) {
    req.flash("error", "Endereço de e-mail ou senha inválido.");
    res.redirect("/admin/login");
  }

  if (!(await bcrypt.compare(password, user.password))) {
    req.flash("error", "Endereço de e-mail ou senha inválido.");
    res.redirect("/admin/login");
  }

  const token = jwt.sign({ userId: user.id }, authConfig.secret, {
    expiresIn: 86400,
  });

  res.cookie("token", token, {
    maxAge: 1000 * 60 * 60 * 24,
    httpOnly: true,
  });
  res.redirect("/admin/");
});

module.exports = router;
