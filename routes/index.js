var express = require("express");
var router = express.Router();

/* GET Página Inicial. */
router.get("/", function (req, res, next) {
  res.render("index");
});

/* GET Sobre Nós. */
router.get("/sobre-nos", function (req, res, next) {
  res.render("about");
});

/* GET Produtos. */
router.get("/produtos", function (req, res, next) {
  res.render("products");
});

/* GET Lojas. */
router.get("/lojas", function (req, res, next) {
  res.render("stores");
});

/* GET Fale Conosco. */
router.get("/fale-conosco", function (req, res, next) {
  res.render("contact");
});


module.exports = router;
