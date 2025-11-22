// const jwt = require("jsonwebtoken");
import jwt from "jsonwebtoken";
// const database = require("../config/db");
// const db = database.getDB();
import { getDB } from "../config/db.js";
const db = getDB();


// module.exports.checkUser = (req, res, next) => {
//   const token = req.cookies.jwt;
//   if (token) {
//     jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
//       if (err) {
//         res.locals.user = null;
//         console.log(err);
//         res.cookie("jwt", "", { maxAge: 1 });
//         res.redirect("/");
//         next();
//       } else {
//         const sql =
//           "SELECT user_id FROM users WHERE user_id ='" + decodedToken.id + "';";
//         db.query(sql, async (err, result) => {
//             if(result.length === 0){
//                 res.locals.user = null;
//           } else {
//             res.locals.user = result[0].user_id;
//             next();  
//           }
//         });
//       }
//     });
//   } else {
//     res.locals.user = null;
//     next();
//   }
// };

// module.exports.requireAuth = (req, res, next) => {
//   const token = req.cookies.jwt;
//   if (token) {
//     jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
//       if (err) {
//         console.log(err);
//         res.cookie("jwt", "", { maxAge: 1 });
//         res.redirect("/");
//       } else {
//         next();
//       }
//     });
//   } else {
//     res.json("");
//   }
// };


  const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
      jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
        if (err) {
          res.locals.user = null;
          console.log(err);
          res.cookie("jwt", "", { maxAge: 1 });
          res.redirect("/");
          next();
        } else {
          const sql =
            "SELECT user_id FROM users WHERE user_id ='" + decodedToken.id + "';";
          db.query(sql, async (err, result) => {
              if(result.length === 0){
                  res.locals.user = null;
            } else {
              res.locals.user = result[0].user_id;
              next();  
            }
          });
        }
      });
    } else {
      res.locals.user = null;
      next();
    }
  };

  const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
      jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
        if (err) {
          console.log(err);
          res.cookie("jwt", "", { maxAge: 1 });
          res.redirect("/");
        } else {
          next();
        }
      });
    } else {
      res.json("");
    }
  };


export default {
  checkUser,
  requireAuth
};
