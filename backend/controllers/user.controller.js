const database = require("../config/db");
const db = database.getDB();
const userData = "user_id AS _id, firstname, lastname, email, picture, createdAt, bio";

module.exports.getAllUsers = async (req, res) => {
  const sql = "SELECT " + userData + " FROM users;";
  db.query(sql, async (err, result) => {
    if (err) {
      return res.status(404).json({ err });
    }
    return res.status(200).json(result);
  });
};

module.exports.userInfo = async (req, res) => {
  const tab = ["test"];
  const sql =
    "SELECT " +
    userData +
    " FROM users WHERE user_id = '" +
    req.params.id +
    "';";
  db.query(sql, async (err, result) => {
    if (err == null) {
/*       result[0].likes = [];
      const sqlGetLikes =
        "SELECT postId FROM likes WHERE userId ='" + req.params.id + "';";
      db.query(sqlGetLikes, async (err, likesArray) => {
        if (err == null) {
          //suppression key PostId
          var rObj = likesArray.map( value => value.postId);
          result[0].likes.push(rObj); */
          res.json(result[0]);
/*         } else {
          console.log(err);
        }
      }); */
    } else {
      console.log("ID unknow: " + err);
    }
  });
};

module.exports.updateUser = async (req, res) => {
  const sql =
    "UPDATE `users` SET `bio` = '" +
    req.body.bio +
    "' WHERE `user_id` = '" +
    req.params.id +
    "';";
console.log(sql);
  db.query(sql, async (err, result) => {
    if (err == null) {
      res.json(result[0]);
    } else {
      console.log("ID unknow: " + err);
    }
  });
};
