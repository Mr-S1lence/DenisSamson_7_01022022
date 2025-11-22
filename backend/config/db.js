// const mysql = require("mysql");
import mysql from "mysql2";

var db = mysql.createConnection({
    database: 'projet7',
    host: "localhost",
    user: "root",
    password: "Azerty35000"
  });

//  module.exports.getDB = () => {
//      return db
//  }
export const getDB = () => {
  return db;
};