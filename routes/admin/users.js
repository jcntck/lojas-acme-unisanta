var express = require("express");
var bcrypt = require("bcryptjs");
var connection = require("../../database/connection");
var auth = require("../../middlewares/auth");

var router = express.Router();

// router.use(auth);

// // teste
// router.get("/teste", async function (req, res) {
//   res.render("admin/pages/teste", { layout: "admin/layout" });
// });

// READ
router.get("/", auth, async function (req, res) {
  const users = await connection("users").select("*").orderBy("id", "desc");

  res.render("admin/pages/users/index", {
    layout: "admin/layout",
    extractScripts: true,
    link: "usuario.listar",
    success: req.flash("success"),
    users
  });
});

// CREATE
router.get("/cadastrar", auth, function (req, res) {
  res.render("admin/pages/users/create", {
    layout: "admin/layout",
    link: "usuario.cadastrar",
  });
});

router.post("/salvar", auth, async function (req, res) {
  var { email, password } = req.body;

  password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

  var [id] = await connection("users").insert({
    email,
    password,
  });

  res.send({ id });
});

// UPDATE
router.get("/editar/:id", auth, async function(req, res) {
  var { id } = req.params;

  const user = await connection("users").where({id}).first();

  res.render('admin/pages/users/update', {
    layout: "admin/layout",
    link: "usuario.editar",
    // extractScripts: true,
    user
  });
});

router.post("/update/:id", auth, async function (req, res) {
  var { id } = req.params;
  var { email, password } = req.body;

  const data = { email };

  if (password !== "") {
    password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

    data.password = password;
  }

  var users = await connection("users")
    .where("id", id)
    .update(data);

  req.flash("success", "Usuário atualizado com sucesso!");
  res.redirect("/admin/usuarios");
});

// DELETE
router.post("/delete/:id", auth, async function (req, res) {
  var { id } = req.params;

  await connection("users").where("id", id).delete();

  req.flash("success", "Usuário deletado com sucesso!");
  res.redirect("/admin/usuarios");
});

module.exports = router;
