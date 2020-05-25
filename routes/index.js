var express = require("express");
var connection = require("../database/connection");

var router = express.Router();

/* GET Página Inicial. */
router.get("/", async function (req, res, next) {
  const products = await connection("products")
    .select("*")
    .orderBy(connection.raw("RANDOM()"))
    .limit(4);

  res.render("site/pages/index", { products });
});

/* GET Sobre Nós. */
router.get("/sobre-nos", function (req, res, next) {
  res.render("site/pages/about");
});

/* GET Produtos. */
router.get("/produtos", async function (req, res, next) {
  const { search } = req.query;

  var products = [];
  if (search) {
    products = await connection("products")
      .where("name", "like", `%${search}%`)
      .select("*")
      .orderBy("id", "desc");
  } else {
    products = await connection("products").select("*").orderBy("id", "desc");
  }

  res.render("site/pages/products", { products });
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
