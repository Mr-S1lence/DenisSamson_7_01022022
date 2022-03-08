const database = require("../config/db");
const db = database.getDB();
const fs = require("fs");
const { promisify } = require("util");
const { uploadErrors } = require("../utils/errors.utils");
const pipeline = promisify(require("stream").pipeline);

module.exports.readPost = (req, res) => {
  const dataPost =
    "p.post_id AS _id, p.posterId, p.message, p.picture, p.video, p.createdAt, p.updatedAt";
  const sql =
    "SELECT " +
    dataPost +
    ", (SELECT COUNT(*) FROM comments WHERE p.post_id = comments.postId) AS comments " +
    ", GROUP_CONCAT(COALESCE(likes.userId, '')) likers " +
    "FROM posts p " +
    "LEFT JOIN likes ON p.post_id = likes.postId " +
    "LEFT JOIN comments ON p.post_id = comments.postId " +
    "GROUP BY `post_id` ORDER BY createdAt DESC;";

    console.log(sql);
  try {
    db.query(sql, async (err, result) => {
      if (err == null) {
            res.json(result);
      } else {
        console.log(err);
      }
    });
  } catch (err) {
    return res.status(400).send(err);
  }
};

module.exports.createPost = async (req, res) => {
  if (req.file !== null) {
    try {
      if (
        req.file.detectedMimeType != "image/jpg" &&
        req.file.detectedMimeType != "image/png" &&
        req.file.detectedMimeType != "image/jpeg"
      )
        throw Error("invalid file");

      if (req.file.size > 50000000) throw Error("max size");
    } catch (err) {
      const errors = uploadErrors(err);
      return res.status(201).json({ errors });
    }
    var fileName = req.body.posterId + Date.now() + ".jpg";

    await pipeline(
      req.file.stream,
      fs.createWriteStream(
        `${__dirname}/../../frontend/public/uploads/posts/${fileName}`
      )
    );
  }

  const post_Id = Date.now() + Math.random();
  const picture = req.file !== null ? "./uploads/posts/" + fileName : "";

  const sql =
    "INSERT INTO `posts` (`post_Id`, `posterId`, `message`, `picture`, `video`, `createdAt`) VALUES ('" +
    post_Id +
    "','" +
    req.body.posterId +
    "','" +
    req.body.message +
    "','" +
    picture +
    "','" +
    req.body.video +
    "', NOW());";

  try {
    db.query(sql, async (err, result) => {
      /* console.log(err); */
      if (err == null) {
        res.json(result[0]);
      } else {
        console.log(err);
      }
    });
  } catch (err) {
    return res.status(400).send(err);
  }
};

module.exports.updatePost = (req, res) => {
  const sql =
    "UPDATE posts SET message ='" +
    req.body.message +
    "', updatedAt = NOW() WHERE post_id ='" +
    req.params.id +
    "';";
  db.query(sql, async (err, result) => {
    if (err == null) {
      res.json(result[0]);
    } else {
      console.log(err);
    }
  });
};

module.exports.deletePost = (req, res) => {
  console.log(req);
  console.log(req.params.id);
  const sql = "DELETE FROM posts WHERE post_id ='" + req.params.id + "';";
  console.log(sql);
  db.query(sql, async (err, result) => {
    if (err == null) {
      res.json(result[0]);
    } else {
      console.log(err);
    }
  });
};

module.exports.likePost = async (req, res) => {
  console.log("like");
  console.log(req.body);
  console.log(req.body.userId);
  const sql =
    "INSERT INTO `likes` (postId, userId) VALUES ('" +
    req.params.id +
    "','" +
    req.body.userId +
    "');";

  db.query(sql, async (err, result) => {
    if (err == null) {
      res.json(result[0]);
    } else {
      console.log(err);
    }
  });
};

module.exports.unlikePost = async (req, res) => {
  console.log("unlike");
  const sql =
    "DELETE FROM `likes` WHERE likes.userId = '" +
    req.body.id +
    "' AND likes.postId = '" +
    req.params.id +
    "';";

  db.query(sql, async (err, result) => {
    if (err == null) {
      res.json(result[0]);
    } else {
      console.log(err);
    }
  });
};

module.exports.getLikePostByUser = async (req, res) => {
  const sql = "SELECT postId FROM likes WHERE userId ='" + req.params.id + "';";
  console.log(sql);
  db.query(sql, async (err, result) => {
    if (err == null) {
      res.json(result);
    } else {
      console.log(err);
    }
  });
};
