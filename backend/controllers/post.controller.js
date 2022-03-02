const database = require("../config/db");
const db = database.getDB();
const fs = require("fs");
const { promisify } = require("util");
const { uploadErrors } = require("../utils/errors.utils");
const pipeline = promisify(require("stream").pipeline);

module.exports.readPost = (req, res) => {
  const sql =
    "SELECT post_id AS _id, posterId, message, picture, video, createdAt, updatedAt FROM posts ORDER BY createdAt DESC";
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
  const fileName = req.body.posterId + Date.now() + ".jpg";

  await pipeline(
    req.file.stream,
    fs.createWriteStream(
      `${__dirname}/../../frontend/public/uploads/posts/${fileName}`
    )
  );

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

module.exports.likePost = async (req, res) => {
  const { userId, postId } = req.body;

  const sql =
    "SELECT * FROM `likes` WHERE likes.userId = '"+userId+"' AND likes.postId = '"+postId+"';";
  console.log(sql);
  try {
    db.query(sql, async (err, result) => {
      if (err == null) {
        if (result.length === 0){
          const sql = "INSERT INTO `likes` (postId, userId) VALUES ('" + req.body.postId + "','" + req.body.userId + "');";
          db.query(sql, (err, result) => {
            if (err == null) {
              res.json(result[0]);
            } else {
              console.log(err);
            }
          });          
        }else{
          const sql = "DELETE FROM `likes` WHERE likes.userId = '"+userId+"' AND likes.postId = '"+postId+"';";
          console.log(sql);
          db.query(sql, (err, result) => {
            if (err == null) {
              res.json(result[0]);
            } else {
              console.log(err);
            }
          }); 
        }
      } else {
        console.log(err);
      }
    });
  } catch (err) {
    return res.status(400).send(err);
  }

  /*   const sql = "INSERT INTO `likes` (postId, userId) VALUES ('" + req.body.postId + "','" + req.body.userId + "');"
  console.log(sql);
  try {
    db.query(sql, async (err, result) => {
      if (err == null) {
        res.json(result[0]);
      } else {
        console.log(err);
      }
    });
  } catch (err) {
    return res.status(400).send(err);
  } */
};
