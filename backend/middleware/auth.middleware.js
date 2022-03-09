const jwt = require("jsonwebtoken");
const database = require("../config/db");
const db = database.getDB();

module.exports.checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  /*  console.log(req.cookies.jwt); */

  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        console.log(err);
        res.cookie("jwt", "", { maxAge: 1 });
        res.redirect("/");
        next();
      } else {
        const sql =
          "SELECT user_id FROM users WHERE user_id ='" + decodedToken.id + "';";
        db.query(sql, async (err, result) => {
          if (result[0].user_id) {
            res.locals.user = result[0].user_id;
            next();
          } else {
            res.locals.user = null;
          }
        });
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

module.exports.requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodeToken) => {
      if (err) {
        console.log(err);
        res.cookie("jwt", "", { maxAge: 1 });
        res.redirect("/");
      } else {
        next();
      }
    });
  } else {
    console.log("No token");
    res.json("");
  }
};
