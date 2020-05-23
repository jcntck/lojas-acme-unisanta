var express = require("express");
var auth = require("../../middlewares/auth");

var router = express.Router();

router.get("/", auth, function (req, res) {
  res.render("admin/pages/home/index", {
    layout: "admin/layout",
    link: "home",
  });
});

router.get("/logoff", auth, function (req, res) {
  res.clearCookie("token");
  res.redirect("/admin/login");
});

module.exports = router;
