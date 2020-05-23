const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth.json");

module.exports = (req, res, next) => {
  const cookie = req.cookies.token;

  if (!cookie) res.redirect("/admin/login");

  jwt.verify(cookie, authConfig.secret, (err, decoded) => {
    if (err) res.redirect("/admin/login");

    req.userId = decoded.userId;
    next();
  });
};
