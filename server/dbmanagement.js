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

con.query("DROP TABLE books", function (err, result) {
  if (err) throw err;
  console.log("Table deleted")
})

var books = "CREATE TABLE books (\
  id VARCHAR(255) PRIMARY KEY, \
  title VARCHAR(255), \
  author VARCHAR(255), \
  image VARCHAR(255), \
  description VARCHAR(255), \
  isbn10 VARCHAR(255), \
  publisher VARCHAR(255), \
  publishDate VARCHAR(255))"

con.query(books, function(err, result) {
  if (err) throw err
  console.log("Books table created")
})

con.query("DROP TABLE groups", function (err, result) {
  if (err) throw err;
  console.log("Groups table deleted")
})

var groups = "CREATE TABLE groups (\
  id VARCHAR(255) PRIMARY KEY, \
  name VARCHAR(255), \
  currentBook VARCHAR(255), \
  nextBook VARCHAR(255))"

con.query(groups, function(err, results) {
  if (err) throw err
  console.log("Groups table created")
})

con.query("DROP TABLE messages", function (err, result) {
  if (err) throw err;
  console.log("Messages table deleted")
})

var messages = "CREATE TABLE messages (\
  entityId VARCHAR(255), \
  userId VARCHAR(255), \
  content VARCHAR(900), \
  dateSent DATETIME)"

con.query(messages, function(err, results) {
  if (err) throw err
  console.log("Messages table created")
})

con.query("DROP TABLE groupUsers", function (err, result) {
  if (err) throw err;
  console.log("groupUsers table deleted")
})

var groupUsers = "CREATE TABLE groupUsers (\
  userId VARCHAR(255), \
  groupId VARCHAR(255), \
  role VARCHAR(255))"

con.query(groupUsers, function(err, results) {
  if (err) throw err
  console.log("groupUsers table created")
})

con.query("DROP TABLE shelves", function (err, result) {
  if (err) throw err;
  console.log("Shelves table deleted")
})

var shelves = "CREATE TABLE shelves (\
  id VARCHAR(255), \
  entityId VARCHAR(255), \
  name VARCHAR(255))"

con.query(shelves, function(err, results) {
  if (err) throw err
  console.log("Shelves table created")
})

con.query("DROP TABLE shelfBooks", function (err, result) {
  if (err) throw err;
  console.log("shelfBooks table deleted")
})

var shelfBooks = "CREATE TABLE shelfBooks (\
  shelfId VARCHAR(255), \
  bookId VARCHAR(255))"

con.query(shelfBooks, function(err, results) {
  if (err) throw err
  console.log("shelfBooks table created")
})