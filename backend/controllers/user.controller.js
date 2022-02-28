const database = require("../config/db");
const db = database.getDB();
const userData = "user_id AS _id, pseudo, email, picture, createdAt, bio"

module.exports.getAllUsers = async (req, res) => {
  const sql =
    "SELECT " + userData + " FROM users;";
  db.query(sql, async (err, result) => {
    if (err) {
      return res.status(404).json({ err });
    }
    return res.status(200).json(result);
  });
};

module.exports.userInfo = async (req, res) => {
  const sql =
    "SELECT " + userData + " FROM users WHERE user_id = '" +
    req.params.id +
    "';";
  /*     console.log(req.params); */
   db.query(sql, async (err, result) => {
    console.log(err);
    if (err == null) {
      res.json(result[0]);
    } else {
      console.log("ID unknow: " + err);
    }
  });
};


module.exports.updateUser = async (req, res) => {
  console.log(req.params.id);
  console.log(req.body.bio);

  const sql =
    "UPDATE `users` SET `bio` = '" +
    req.body.bio +
    "' WHERE `user_id` = '" +
    req.params.id +
    "';"
/*      SELECT " + userData + " FROM `users` WHERE `user_id` = '" +
    req.params.id +"';"; */
    console.log(sql);

  db.query(sql, async (err, result) => {
    console.log(result);
    console.log(err);
    if (err == null) {
      res.json(result[0]);
    } else {
      console.log("ID unknow: " + err);
    }
  });

};
