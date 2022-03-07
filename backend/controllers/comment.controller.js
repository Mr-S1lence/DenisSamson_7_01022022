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
/*   const sql =
    "SELECT comment_id AS _id, commenterId, commenterPseudo, text, createdAt, postId FROM comments WHERE postId = '"+ req.params.id + "'ORDER BY createdAt ASC;"; */

/*     const sql =
    "SELECT c.comment_id AS _id, c.commenterId, c.commenterPseudo, c.text, c.createdAt, c.postId FROM comments c WHERE c.postId = '"+ req.params.id + "' LEFT JOIN users ON c.commenterId = users.users_id ORDER BY createdAt ASC;";
     */
    const sql =
    "SELECT c.comment_id AS _id, c.commenterId, c.text, c.createdAt, c.postId, users.firstname, users.lastname FROM comments c LEFT JOIN users ON c.commenterId = users.user_id WHERE c.postId = '"+ req.params.id + "' ORDER BY createdAt ASC;";
    
    console.log(sql);
  db.query(sql, async (err, result) => {
    if (err == null) {
      res.json(result);
    } else {
      console.log(err);
    }
  });
};


/* const dataPost =
"p.post_id AS _id, p.posterId, p.message, p.picture, p.video, p.createdAt, p.updatedAt";
const sql =
"SELECT " +
dataPost +
", GROUP_CONCAT(COALESCE(likes.userId, '')) likers FROM posts p LEFT JOIN likes ON p.post_id = likes.postId GROUP BY `post_id` ORDER BY createdAt DESC";
 */



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

module.exports.deleteComment = (req, res) => {
  console.log(req);
  console.log(req.params.id);
  const sql = "DELETE FROM comments WHERE post_id ='" + req.params.id + "';";
  console.log(sql);
  db.query(sql, async (err, result) => {
    if (err == null) {
      res.json(result[0]);
    } else {
      console.log(err);
    }
  });
}