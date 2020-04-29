const express = require('express');
const app = express();
var mysql = require('mysql');
var con  = mysql.createConnection({
  host            : 'localhost',
  user            : 'NEW_USER',
  password        : 'NEW_PASSWORD',
  database        : 'bookclubdb'
});
 
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

con.query("DROP TABLE users", function (err, result) {
  if (err) throw err;
  console.log("Table deleted")
})

var users = "CREATE TABLE users ( \
  id VARCHAR(255) PRIMARY KEY, \
  username VARCHAR(255), \
  password VARCHAR(255), \
  firstName CHAR(30), \
  lastName CHAR(30), \
  profilePic VARCHAR(255), \
  dateCreated DATETIME)";
con.query(users, function (err, result) {
  if (err) throw err;
  console.log("Tables created");
})

