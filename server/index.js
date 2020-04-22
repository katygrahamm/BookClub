const express = require('express');
const http = require('http');
const app = express();
const cors = require('cors');
const axios = require('axios')
const NYTKey = 'g9RMD5mNaimpkARE0hiazQ1cCM19KiQE'
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
  var sql = "CREATE TABLE customers (name VARCHAR(255), address VARCHAR(255))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
});

// Gets the NYT's bestseller list for fiction books
app.get('/nyt-books-fiction', (req, res) => {
  axios.get(`https://api.nytimes.com/svc/books/v3/lists/current/combined-print-and-e-book-fiction.json?api-key=${NYTKey}`
  ).then(function (response) {
    console.log('response from nyt', response)
    res.send(response.data.results.books)
    })
  .catch(function (error) {
    console.log(error);
    })
});

// Gets the NYT's bestseller list for nonfiction books
app.get('/nyt-books-nonfiction', (req, res) => {
  axios.get(`https://api.nytimes.com/svc/books/v3/lists/current/combined-print-and-e-book-nonfiction.json?api-key=${NYTKey}`
  ).then(function (response) {
    console.log('response from nyt', response)
    res.send(response.data.results.books)
    })
  .catch(function (error) {
    console.log(error);
    })
});

// Gets the NYT's bestseller list for user's choice genre
app.get('/nyt-books-list/:genre', (req, res) => {
  const genre = req.params.genre

  axios.get(`https://api.nytimes.com/svc/books/v3/lists/current/${genre}.json?api-key=${NYTKey}`
  ).then(function (response) {
    console.log('response from nyt', response)
    res.send(response.data.results.books)
    })
  .catch(function (error) {
    console.log(error);
    })
});

// Gets the books from Google Books API search
app.get('/googlebooks', (req, res) => {
  const query = req.query.q
  const page = req.query.page

  axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}&startIndex=${(page - 1) * 10}`
  ).then(function (response) {
    console.log('response from google', response)
    res.send(response.data.items)
    })
  .catch(function (error) {
    console.log(error);
    })
});


// Server Setup
const port = process.env.PORT || 5000;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on:', port);