const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const database = require("../config/db");
const { v4: uuidv4 } = require("uuid");
const { signUpErrors, signInErrors } = require("../utils/errors.utils");
const { checkEmail } = require("../utils/utils");

const maxAge = 3 * 24 * 60 * 60 * 1000;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, {
    expiresIn: maxAge,
  });
};

exports.signUp = async (req, res) => {
  const db = database.getDB();
  const { firstname, lastname, email, password } = req.body;
  const salt = await bcrypt.hash(password, 10);
  const uid = uuidv4();

  if ((await checkEmail(email)) == true) {
    const sql =
      "INSERT INTO `users` (`user_id`, `firstname`, `lastname`, `email`, `password`, `createdAt`) VALUES ('" +
      uid +
      "', '" +
      firstname +
      "', '" +
      lastname +
      "', '" +
      email +
      "', '" +
      salt +
      "', NOW());";
    try {
      db.query(sql, (err, result) => {
        if (!result) {
          const errors = signUpErrors(err);
          res.status(200).send({ errors });
        } else {
          res.status(201).json({ user: uid });
        }
      });
    } catch (err) {
      res.status(200).send({ err });
    }
  } else {
    let errors = { email: "", password: "" };
    errors.email = "Email incorrect";
    res.status(200).send({ errors });
  }
};

module.exports.signIn = async (req, res) => {
  const db = database.getDB();
  const { email, password } = req.body;
  const sql =
    "SELECT password, user_id FROM users WHERE email ='" + email + "';";

  db.query(sql, [email], async (err, results) => {
    let errors = { email: "", password: "" };

    if (err) {
      return res.status(404).json({ err });
    }
    if (!results[0]) {
      errors.email = "Email inconnu !";
      return res.status(200).json({ errors });
    }
    if (results[0]) {
      bcrypt
        .compare(password, results[0].password) //User trouvé : comparration des mdp avec bcrypt
        .then((valid) => {
          if (!valid) {
            errors.password = "Mot de passe incorrect !";
            return res.status(200).json({ errors });
          }
          const token = createToken(results[0].user_id);
          res.cookie("jwt", token, { httpOnly: true, maxAge });
          res.status(200).json({ user: results[0].user_id });
        })
        .catch((err) => res.status(500).json({ err })); //Erreur serveur
    }
  });
};

module.exports.logout = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};
