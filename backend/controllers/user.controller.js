const database = require("../config/db");
const db = database.getDB();

module.exports.getAllUsers = async (req, res) => {
  const sql = "SELECT user_id AS _id, pseudo, email, picture, createdAt FROM users;";
  db.query(sql, async (err, result) => {
    if (err) {
      return res.status(404).json({ err });
    }
    return res.status(200).json(result[0]);
  });
};

module.exports.userInfo = (req, res) => {
  const sql =
    "SELECT user_id AS _id, pseudo, email, picture, createdAt FROM users WHERE user_id = '" +
    req.params.id +
    "';";

  /*     console.log(req.params); */
  db.query(sql, async (err, result) => {
    if (!err) {
      res.json(result[0]);
    } else console.log("ID unknow: " + err);
  });
};
