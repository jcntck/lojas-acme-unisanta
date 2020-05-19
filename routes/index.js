var express = require("express");
var router = express.Router();

/* GET Página Inicial. */
router.get("/", function (req, res, next) {
  res.render("site/pages/index");
});

/* GET Sobre Nós. */
router.get("/sobre-nos", function (req, res, next) {
  res.render("site/pages/about");
});

/* GET Produtos. */
router.get("/produtos", function (req, res, next) {
  res.render("site/pages/products");
});

/* GET Lojas. */
router.get("/lojas", function (req, res, next) {
  res.render("site/pages/stores");
});

/* GET Fale Conosco. */
router.get("/fale-conosco", function (req, res, next) {
  res.render("site/pages/contact");
});

module.exports = router;
