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
  const { pseudo, email, password } = req.body;
  const salt = await bcrypt.hash(password, 10);
  const uid = uuidv4();

  if (await checkEmail(email) == true) {
    const sql =
      "INSERT INTO `users` (`user_id`, `pseudo`, `email`, `password`, `createdAt`) VALUES ('" +
      uid +
      "', '" +
      pseudo +
      "', '" +
      email +
      "', '" +
      salt +
      "', NOW());";

    try {
      db.query(sql, (err, result) => {
        if (!result) {
          console.log("no result");
          const errors = signUpErrors(err);
          res.status(200).send({ errors });
        } else {
          res.status(201).json({ user: uid });
        }
      });
    } catch (err) {
      /* const errors = signUpErrors(err); */
      console.log("erreur catch");
      res.status(200).send({ err });
    }
  } else {
    let errors = { pseudo: '', email: '', password: ''}
    errors.email = "Email incorrect";
    res.status(200).send({ errors });
  }
};
