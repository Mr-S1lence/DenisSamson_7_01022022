const database = require("../config/db");
const db = database.getDB();

module.exports.createComment = (req, res) => {
  console.log("comment post");
  console.log(req.params.id);
  console.log(req.body);


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
  console.log("lire comment post");
  /*   console.log(req.) */

  const sql =
    "SELECT comment_id AS _id, commenterId, commenterPseudo, text, createdAt, postId FROM comments WHERE postId = '"+ req.params.id + "'ORDER BY createdAt DESC;";
    console.log(sql);
  db.query(sql, async (err, result) => {
    if (err == null) {
      console.log("read comments");
/*       console.log(result); */
      res.json(result);
    } else {
      console.log(err);
    }
  });
};
