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
    "SELECT comment_id AS _id, commenterId, commenterPseudo, text, createdAt, postId FROM comments WHERE postId = '"+ req.params.id + "'ORDER BY createdAt ASC;";
  db.query(sql, async (err, result) => {
    if (err == null) {
      res.json(result);
    } else {
      console.log(err);
    }
  });
};

module.exports.updateComment = (req, res) => {
  console.log("update comment");
  const sql =
    "UPDATE comments SET text ='" +
    req.body.text +
    "', updatedAt = NOW() WHERE comment_id ='" +
    req.body.commentId +
    "';";
    console.log(sql);
  db.query(sql, async (err, result) => {
    if (err == null) {
      res.json(result[0]);
    } else {
      console.log(err);
    }
  });
};
