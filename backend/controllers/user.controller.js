// const database = require("../config/db");
// const db = database.getDB();
import { getDB } from "../config/db.js";
const db = getDB();
const userData =
  "user_id AS _id, firstname, lastname, email, picture, createdAt, disabled, bio";

// module.exports.getAllUsers = async (req, res) => {
//   const sql = "SELECT " + userData + " FROM users;";
//   db.query(sql, async (err, result) => {
//     if (err) {
//       return res.status(404).json({ err });
//     }
//     return res.status(200).json(result);
//   });
// };

// module.exports.userInfo = async (req, res) => {
//   const sql =
//     `SELECT ` +
//     userData +
//     `, status FROM users WHERE user_id = "${req.params.id}";`;
//   db.query(sql, async (err, result) => {
//     if (err == null) {
//       res.json(result[0]);
//     } else {
//       console.log("ID unknow: " + err);
//     }
//   });
// };

// module.exports.updateUser = async (req, res) => {
//   const sql = `UPDATE users SET bio =  "${req.body.bio}" WHERE user_id = "${req.params.id}";`;
//   db.query(sql, async (err, result) => {
//     if (err == null) {
//       res.json(result[0]);
//     } else {
//       console.log("ID unknow: " + err);
//     }
//   });
// };

// module.exports.desactivateUser = async (req, res) => {
//   const sql = `UPDATE users SET disabled = 1 WHERE user_id = "${req.params.id}";`;

//   db.query(sql, async (err, result) => {
//     if (err) {
//       res.status(200).send(err);
//     } else {
//       res.clearCookie("jwt");
//       res.redirect("/");
//       res.status(200).json("Account desactivate");
//     }
//   });
// };

const userController = {
  getAllUsers: async (req, res) => { 
    const sql = "SELECT " + userData + " FROM users;";
    db.query(sql, async (err, result) => {
      if (err) {
        return res.status(404).json({ err });
      }
      return res.status(200).json(result);
    });
  },
  userInfo: async (req, res) => {
    const sql =
    `SELECT ` +
    userData +
    `, status FROM users WHERE user_id = "${req.params.id}";`;
  db.query(sql, async (err, result) => {
    if (err == null) {
      res.json(result[0]);
    } else {
      console.log("ID unknow: " + err);
    }
  });
  },
  updateUser: async (req, res) => {
    const sql = `UPDATE users SET bio =  "${req.body.bio}" WHERE user_id = "${req.params.id}";`;
    db.query(sql, async (err, result) => {
      if (err == null) {
        res.json(result[0]);
      } else {
        console.log("ID unknow: " + err);
      }
    });
  },
  desactivateUser: async (req, res) => {
    const sql = `UPDATE users SET disabled = 1 WHERE user_id = "${req.params.id}";`;

    db.query(sql, async (err, result) => {
      if (err) {
        res.status(200).send(err);
      } else {
        res.clearCookie("jwt");
        res.redirect("/");
        res.status(200).json("Account desactivate");
      }
    });
  }
};

export default userController;
