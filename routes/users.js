var express = require("express");
var bcrypt = require('bcryptjs');
var connection = require('../database/connection');
var router = express.Router();

// READ
router.get("/", async function (req, res) {
  const users = await connection('users').select('*');

  res.send({ users });
});

// CREATE
router.post("/", async function (req, res) {
  var { email, password } = req.body;

  password = bcrypt.hashSync(
    password,
    bcrypt.genSaltSync(10)
  );

  var [id] = await connection("users").insert({
    email,
    password
  });

  res.send({ id });
});

// UPDATE
router.put("/:id", async function(req, res) {
  var { id } = req.params;
  var { email, password } = req.body;

  password = bcrypt.hashSync(
    password,
    bcrypt.genSaltSync(10)
  );

  var users = await connection('users')
            .where('id', id)
            .update({ email, password });

  res.send({ users });
});

// DELETE
router.delete("/:id", async function(req, res) {
  var { id } = req.params;

  await connection('users').where('id', id).delete();

  res.send({ mens: "Usuário deletado com sucesso" });
});

module.exports = router;
