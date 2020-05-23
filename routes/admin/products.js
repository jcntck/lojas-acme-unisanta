var express = require("express");
var connection = require("../../database/connection");
var auth = require("../../middlewares/auth");

var router = express.Router();

// READ
router.get("/", auth, async function (req, res) {
  const products = await connection("products").select("*").orderBy("id", "desc");

  res.render("admin/pages/products/index", {
    layout: "admin/layout",
    extractScripts: true,
    link: "produtos.listar",
    success: req.flash("success"),
    products
  });
});

// CREATE
router.get("/cadastrar", auth, function (req, res) {
  res.render("admin/pages/products/create", {
    layout: "admin/layout",
    link: "produtos.cadastrar",
  });
});

router.post("/salvar", auth, async function (req, res) {
  var { name, description, price } = req.body;

  var [id] = await connection("products").insert({
    name,
    description,
    price
  });

  res.send({ id });
});

// UPDATE
router.get("/editar/:id", auth, async function(req, res) {
  var { id } = req.params;

  const product = await connection("products").where({id}).first();

  res.render('admin/pages/products/update', {
    layout: "admin/layout",
    link: "produtos.editar",
    // extractScripts: true,
    product
  });
});

router.post("/update/:id", auth, async function (req, res) {
  var { id } = req.params;
  var { name, description, price } = req.body;

  var products = await connection("products")
    .where("id", id)
    .update({ name, description, price });

  req.flash("success", "Produto atualizado com sucesso!");
  res.redirect("/admin/produtos");
});

// DELETE
router.post("/delete/:id", auth, async function (req, res) {
  var { id } = req.params;

  await connection("products").where("id", id).delete();

  req.flash("success", "Produto deletado com sucesso!");
  res.redirect("/admin/produtos");
});

module.exports = router;
