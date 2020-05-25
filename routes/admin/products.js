var express = require("express");
var path = require("path");
var multer = require("multer");
var fs = require("fs");

var { images } = require("../../config/upload");
var connection = require("../../database/connection");
var auth = require("../../middlewares/auth");

var router = express.Router();
var upload = multer({ dest: images.products.dest });

// READ
router.get("/", async function (req, res) {
  const products = await connection("products")
    .select("*")
    .orderBy("id", "desc");

  res.render("admin/pages/products/index", {
    layout: "admin/layout",
    extractScripts: true,
    link: "produtos.listar",
    success: req.flash("success"),
    products,
  });
});

// CREATE
router.get("/cadastrar", function (req, res) {
  res.render("admin/pages/products/create", {
    layout: "admin/layout",
    link: "produtos.cadastrar",
  });
});

router.post("/salvar", upload.single("image"), async function (req, res) {
  var { name, description } = req.body;
  var image = req.file;

  var [id] = await connection("products").insert({
    name,
    description,
  });

  const filename = `products-img-${id}${path.extname(image.originalname)}`;
  const newPath = `${images.products.dest}/${filename}`;
  fs.rename(image.path, newPath, async function (err) {
    if (err) throw err;
    await connection("products").where("id", id).update({ image: filename });
  });

  req.flash("success", "Produto cadastrado com sucesso!");
  res.redirect("/admin/produtos");
});

// UPDATE
router.get("/editar/:id", auth, async function (req, res) {
  var { id } = req.params;

  const product = await connection("products").where({ id }).first();

  res.render("admin/pages/products/update", {
    layout: "admin/layout",
    link: "produtos.editar",
    // extractScripts: true,
    product,
  });
});

router.post("/update/:id", auth, upload.single("image"), async function (
  req,
  res
) {
  var { id } = req.params;
  var { name, description } = req.body;
  var image = req.file;

  if (!image) {
    await connection("products").where("id", id).update({ name, description });
  } else {
    const product = await connection("products").where({ id }).first();
    fs.unlinkSync(`${images.products.dest}/${product.image}`);

    const filename = `products-img-${id}${path.extname(image.originalname)}`;
    const newPath = `${images.products.dest}/${filename}`;
    fs.rename(image.path, newPath, async function (err) {
      if (err) throw err;
      await connection("products").where("id", id).update({ image: filename });
    });
  }

  req.flash("success", "Produto atualizado com sucesso!");
  res.redirect("/admin/produtos");
});

// DELETE
router.post("/delete/:id", auth, async function (req, res) {
  var { id } = req.params;

  const product = await connection("products").where({ id }).first();
  fs.unlinkSync(`${images.products.dest}/${product.image}`);

  await connection("products").where("id", id).delete();

  req.flash("success", "Produto deletado com sucesso!");
  res.redirect("/admin/produtos");
});

module.exports = router;
