const jwt = require('jsonwebtoken');
const database = require("../config/db");

module.exports.checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    const db = database.getDB();
    if(token ) {
        jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
            if(err){
                res.locals.user = null;

                next();
            } else {
                console.log(decodedToken);
               /*  let user = UserModel.findById(decodedToken.id); */
              /*  const sql = */
                res.locals.user = user;
                next();
            }
        })
    } else {
        res.locals.user = null;
        next();
    }
}


module.exports.requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodeToken)=> {
            if (err){
                console.log(err);
            } else {
                console.log(decodeToken.id);
                res.status(200).json(decodeToken.id);
                next();
            }
        });
    }else{
        console.log('No token');
        res.json('');
    }
}