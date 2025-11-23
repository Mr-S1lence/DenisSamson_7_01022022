import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";
import { getDB } from "../config/db.js";
const database = getDB();
import { v4 as uuidv4 } from "uuid";
import { signUpErrors } from "../utils/errors.utils.js";
import { checkEmail } from "../utils/utils.js";

const maxAge = 3 * 24 * 60 * 60 * 1000;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, {
    expiresIn: maxAge,
  });
};

export const signUp = async (req, res) => {
  const db = getDB();
  const { firstname, lastname, email, password } = req.body;
  const salt = await bcrypt.hash(password, 10);
  const uid = uuidv4();

  if (await checkEmail(email)) {
    const sql =
      `INSERT INTO users (user_id, firstname, lastname, email, password, createdAt) ` +
      `VALUES ("${uid}", "${firstname}", "${lastname}", "${email}", "${salt}", NOW());`;
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

export const signIn = async (req, res) => {
  const db = getDB();
  const { email, password } = req.body;
  const sql = `SELECT password, user_id, disabled FROM users WHERE email = ?`;

  db.query(sql, [email], async (err, results) => {
    let errors = { email: "", password: "" };

    if (err) {
      return res.status(404).json({ err });
    }
    if (!results[0]) {
      errors.email = "Email inconnu !";
      return res.status(200).json({ errors });
    }

    if (results[0].disabled === 1) {
      errors.email =
        "Il semblerait que votre compte soit désactivé. Veuillez contacter un administrateur.";
      return res.status(200).json({ errors });
    }

    if (results[0]) {
      bcrypt
        .compare(password, results[0].password)
        .then((valid) => {
          if (!valid) {
            errors.password = "Mot de passe incorrect !";
            return res.status(200).json({ errors });
          }
          const token = createToken(results[0].user_id);
          console.log("TOKEN CREATED:", token);
          res.cookie("jwt", token, {
            httpOnly: true,
            maxAge: 3600000,
            sameSite: "lax",
          });
          console.log("COOKIE SENT");
          res.status(200).json({ user: results[0].user_id });
        })
        .catch((err) => res.status(500).json({ err }));
    }
  });
};

export const logout = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};
