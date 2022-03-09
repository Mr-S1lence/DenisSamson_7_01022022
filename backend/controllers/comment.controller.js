const database = require("../config/db");
const db = database.getDB();

module.exports.createComment = (req, res) => {
  commentId = Math.random();
  const sql =
    "INSERT INTO comments (`comment_Id`, `commenterId`, `commenterPseudo`, `text`, `createdAt`, `postId`) VALUES ('" +
    commentId +
    "', '" +
    req.body.commenterId +
    "', '" +
    req.body.commenterPseudo +
    "', '" +
    req.body.text +
    "', NOW(), '" +
    req.params.id +
    "');";
  db.query(sql, async (err, result) => {
    if (err == null) {
      res.json(result[0]);
    } else {
      console.log(err);
    }
  });
};

module.exports.readComment = (req, res) => {
  const sql =
    "SELECT c.comment_id AS _id, c.commenterId, c.text, c.createdAt, c.postId, users.firstname, users.lastname FROM comments c LEFT JOIN users ON c.commenterId = users.user_id WHERE c.postId = '" +
    req.params.id +
    "' ORDER BY createdAt ASC;";

  db.query(sql, async (err, result) => {
    if (err == null) {
      res.json(result);
    } else {
      console.log(err);
    }
  });
};

module.exports.updateComment = (req, res) => {
  const sql =
    "UPDATE comments SET text ='" +
    req.body.text +
    "', updatedAt = NOW() WHERE comment_id ='" +
    req.body.commentId +
    "';";

  db.query(sql, async (err, result) => {
    if (err == null) {
      res.json(result[0]);
    } else {
      console.log(err);
    }
  });
};

module.exports.deleteComment = (req, res) => {
  const sql = "DELETE FROM comments WHERE comment_id ='" + req.params.id + "';";
  console.log(sql);
  db.query(sql, async (err, result) => {
    if (err == null) {
      res.json(result[0]);
    } else {
      console.log(err);
    }
  });
};
