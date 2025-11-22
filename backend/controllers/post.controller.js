// const database = require("../config/db");
// const db = database.getDB();
import { getDB } from "../config/db.js";
const db = getDB();

// const fs = require("fs");
// const { promisify } = require("util");
// const { uploadErrors } = require("../utils/errors.utils");
// const pipeline = promisify(require("stream").pipeline);
import { pipeline } from "stream";
import { promisify } from "util";
import { uploadErrors } from "../utils/errors.utils.js";

const asyncPipeline = promisify(pipeline);

// module.exports.readPost = (req, res) => {
//   const dataPost =
//     "p.post_id AS _id, p.posterId, p.message, p.picture, p.video, p.createdAt, p.updatedAt";
//   const sql =
//     "SELECT " +
//     `${dataPost}` +
//     ", (SELECT COUNT(*) FROM comments WHERE p.post_id = comments.postId) AS comments " +
//     ", GROUP_CONCAT(DISTINCT(COALESCE(likes.userId, ''))) likers " +
//     "FROM posts p " +
//     "LEFT JOIN likes ON p.post_id = likes.postId " +
//     "LEFT JOIN comments ON p.post_id = comments.postId " +
//     "LEFT JOIN users ON p.posterId = users.user_id WHERE users.disabled = 0 " +
//     "GROUP BY `post_id` ORDER BY createdAt DESC;";
//   try {
//     db.query(sql, async (err, result) => {
//       if (err == null) {
//         res.json(result);
//       } else {
//         console.log(err);
//       }
//     });
//   } catch (err) {
//     return res.status(400).send(err);
//   }
// };

// module.exports.createPost = async (req, res) => {
//   if (req.file !== null) {
//     try {
//       if (
//         req.file.detectedMimeType != "image/jpg" &&
//         req.file.detectedMimeType != "image/png" &&
//         req.file.detectedMimeType != "image/jpeg"
//       )
//         throw Error("invalid file");

//       if (req.file.size > 50000000) throw Error("max size");
//     } catch (err) {
//       const errors = uploadErrors(err);
//       return res.status(201).json({ errors });
//     }
//     var fileName = req.body.posterId + Date.now() + ".jpg";

//     await pipeline(
//       req.file.stream,
//       fs.createWriteStream(
//         `${__dirname}/../../frontend/public/uploads/posts/${fileName}`
//       )
//     );
//   }

//   const post_Id = Date.now() + Math.random();
//   const picture = req.file !== null ? "./uploads/posts/" + fileName : "";

//   const sql =
//     `INSERT INTO posts (post_Id, posterId, message, picture, video, createdAt) ` +
//     `VALUES ("${post_Id}","${req.body.posterId}","${req.body.message}","${picture}","${req.body.video}", NOW());`;

//   try {
//     db.query(sql, async (err, result) => {
//       if (err == null) {
//         res.json(result[0]);
//       } else {
//         console.log(err);
//       }
//     });
//   } catch (err) {
//     return res.status(400).send(err);
//   }
// };

// module.exports.updatePost = (req, res) => {
//   const sql = `UPDATE posts SET message ="${req.body.message}", updatedAt = NOW() WHERE post_id ="${req.params.id}";`;
//   db.query(sql, async (err, result) => {
//     if (err == null) {
//       res.json(result[0]);
//     } else {
//       console.log(err);
//     }
//   });
// };

// module.exports.deletePost = (req, res) => {
//   const sql = `DELETE FROM posts WHERE post_id ="${req.params.id}";`;
//   db.query(sql, async (err, result) => {
//     if (err == null) {
//       res.json(result[0]);
//     } else {
//       console.log(err);
//     }
//   });
// };

// module.exports.likePost = async (req, res) => {
//   const sql = `INSERT INTO likes (postId, userId) VALUES ("${req.params.id}", "${req.body.userId}");`;

//   db.query(sql, async (err, result) => {
//     if (err == null) {
//       res.json(result[0]);
//     } else {
//       console.log(err);
//     }
//   });
// };

// module.exports.unlikePost = async (req, res) => {
//   const sql = `DELETE FROM likes WHERE likes.userId = "${req.body.id}" AND likes.postId = "${req.params.id}";`;

//   db.query(sql, async (err, result) => {
//     if (err == null) {
//       res.json(result[0]);
//     } else {
//       console.log(err);
//     }
//   });
// };

// module.exports.getLikePostByUser = async (req, res) => {
//   const sql = `SELECT postId FROM likes WHERE userId = "${req.params.id}"`;
//   db.query(sql, async (err, result) => {
//     if (err == null) {
//       res.json(result);
//     } else {
//       console.log(err);
//     }
//   });
// };

const postController = {
  readPost: (req, res) => {
    const dataPost =
      "p.post_id AS _id, p.posterId, p.message, p.picture, p.video, p.createdAt, p.updatedAt";

    const sql =
      "SELECT " +
      `${dataPost}` +
      ", (SELECT COUNT(*) FROM comments WHERE p.post_id = comments.postId) AS comments " +
      ", GROUP_CONCAT(DISTINCT(COALESCE(likes.userId, ''))) likers " +
      "FROM posts p " +
      "LEFT JOIN likes ON p.post_id = likes.postId " +
      "LEFT JOIN comments ON p.post_id = comments.postId " +
      "LEFT JOIN users ON p.posterId = users.user_id WHERE users.disabled = 0 " +
      "GROUP BY p.post_id, p.posterId, p.message, p.picture, p.video, p.createdAt, p.updatedAt " +
      "ORDER BY createdAt DESC;";
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
  },
  createPost: async (req, res) => {  if (req.file !== null) {
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
    `INSERT INTO posts (post_Id, posterId, message, picture, video, createdAt) ` +
    `VALUES ("${post_Id}","${req.body.posterId}","${req.body.message}","${picture}","${req.body.video}", NOW());`;

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
  }},
  updatePost: (req, res) => {
    const sql = `UPDATE posts SET message ="${req.body.message}", updatedAt = NOW() WHERE post_id ="${req.params.id}";`;
    db.query(sql, async (err, result) => {
      if (err == null) {
        res.json(result[0]);
      } else {
        console.log(err);
      }
    });
  },
  deletePost: (req, res) => {
    const sql = `DELETE FROM posts WHERE post_id ="${req.params.id}";`;
    db.query(sql, async (err, result) => {
      if (err == null) {
        res.json(result[0]);
      } else {
        console.log(err);
      }
    });
  },
  likePost: async (req, res) => {
    const sql = `INSERT INTO likes (postId, userId) VALUES ("${req.params.id}", "${req.body.userId}");`;

    db.query(sql, async (err, result) => {
      if (err == null) {
        res.json(result[0]);
      } else {
        console.log(err);
      }
    });
  },
  unlikePost: async (req, res) => {
    const sql = `DELETE FROM likes WHERE likes.userId = "${req.body.id}" AND likes.postId = "${req.params.id}";`;

    db.query(sql, async (err, result) => {
      if (err == null) {
        res.json(result[0]);
      } else {
        console.log(err);
      }
    });
  },
  getLikePostByUser: async (req, res) => {
    const sql = `SELECT postId FROM likes WHERE userId = "${req.params.id}"`;
    db.query(sql, async (err, result) => {
      if (err == null) {
        res.json(result);
      } else {
        console.log(err);
      }
    });
  }
};

export default postController;