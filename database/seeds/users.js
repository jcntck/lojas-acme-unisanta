const bcrypt = require("bcryptjs");

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([
        {
          id: 1,
          email: "suporte@freya.com.br",
          password: bcrypt.hashSync("123456", bcrypt.genSaltSync(10)),
        },
      ]);
    });
};
