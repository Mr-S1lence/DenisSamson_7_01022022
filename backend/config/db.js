const mysql = require("mysql");

var db = mysql.createConnection({
    database: 'projet7',
    host: "localhost",
    user: "root",
    password: "Azerty35000"
  });

module.exports.getDB = () => {
    return db
}