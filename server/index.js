const express = require('express');
const http = require('http');
const app = express();
const cors = require('cors');
const axios = require('axios')
const NYTKey = 'g9RMD5mNaimpkARE0hiazQ1cCM19KiQE'
var mysql = require('mysql');
const passport = require('passport')
const bodyParser = require('body-parser')
const cookieSession = require('cookie-session')
const session = require("express-session")
const LocalStrategy = require('passport-local').Strategy;
const faker = require('faker')

var con  = mysql.createConnection({
  host            : 'localhost',
  user            : 'NEW_USER',
  password        : 'NEW_PASSWORD',
  database        : 'bookclubdb'
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
 
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

app.use(
  cors({
    origin: 'http://localhost:3000', // allow to server to accept request from different origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

app.use(cookieSession({
  name: 'session',
  keys: ['helloworld'],

  maxAge: 24 * 60 * 60 * 1000
}))

app.use(passport.initialize());
app.use(passport.session());

passport.use('login', new LocalStrategy ((username, password, done) => {

  var searchUser = `SELECT * FROM users WHERE username='${username}' AND password='${password}'`
  con.query(searchUser, function (err, result) {
    if (err) throw err;
    console.log(result)
    if (result.length > 0) {
     return done(null, { myUser: result[0].username, myID: result[0].id });
    } else {
     return done(null, false);
    }
  })
}));

passport.serializeUser((user, done) => {
  console.log(user);
  done(null, user);
});

passport.deserializeUser((user, done) => {
  console.log(user);
  done(null, user);
});

function checkAuthentication(req,res,next){
  if(req.isAuthenticated()){
      //req.isAuthenticated() will return true if user is logged in
      next();
  } else{
    console.log("Not authenticated")
    res.redirect("/");
  }
}

app.post('/sign-up', (req,res) => {
  console.log(req.body)
  let username = req.body.newUsername
  let password = req.body.newPassword
  let date = new Date().toISOString().slice(0, 19).replace('T', ' ');
  let image = faker.image.avatar()

  let d = new Date();
  let n = 'user' + (new Date()).getTime().toString(36)
  console.log(n)

  var insertQuery = `INSERT INTO users (id, username, password, dateCreated, profilePic) VALUES ('${n}', '${username}', '${password}', '${date}', '${image}')`
  con.query(insertQuery, function (err, result) {
    if (err) throw err;
  })
});

app.post('/login', passport.authenticate('login', {failureRedirect: '/'}), (req, res) => {
  var searchUser = `SELECT * FROM users WHERE username='${req.user.myUser}'`
  con.query(searchUser, function (err, result) {
    if (err) throw err;
    res.send(result)
  })
});

app.get("/test", checkAuthentication, (req, res) => {
  res.send("Success")
})

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
app.get('/google-books', (req, res) => {
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

app.post("/add-group", (req, res) => {
  var searchUser = `SELECT * FROM users WHERE username='${req.user.myUser}'`

  let private = ""
  if (req.body.groupPrivate) {
    private = "FALSE"
  } else {
    private = "TRUE"
  }
  con.query(searchUser, function (err, user) {
    if (err) throw err;
    const groupId = 'group' + (new Date()).getTime().toString(36)
    console.log(groupId)

    var insertGroup = `INSERT INTO groups (id, name, currentBook, nextBook, open) VALUES ('${groupId}', '${req.body.groupName}', '', '', ${private})`

    con.query(insertGroup, function(err, result) {
      if (err) throw err
    })

    var insertGroupUser = `INSERT INTO groupUsers(groupId, userId, role) VALUES ('${groupId}', '${user.id}', 'admin.')`

    con.query(insertGroupUser, function(err, result) {
      if (err) throw err
    })
  })
})

app.post("/add-book/:shelfId", (req, res) => {
  var shelfid = req.params.shelfId

  var title = req.body.title
  var author = req.body.author
  var image = req.body.image
  var description = req.body.description
  var isbn10 = req.body.isbn10
  var publisher = req.body.publisher
  var publishDate = req.body.publishDate
  var id = 'book' + (new Date()).getTime().toString(36)

  var insertBook = `INSERT INTO books (id, title, author, image, description, isbn10, publisher, publishDate) VALUES ('${id}', '${title}', '${author}', '${image}', '${description}', '${isbn10}', '${publisher}', '${publishDate}')`
  
  con.query(insertBook, function (err, result) {
    if (err) throw err;
  })

  var insertShelfBook = `INSERT INTO shelfBooks (shelfId, bookId) VALUES ('${shelfid}', '${id}')`
  con.query(insertShelfBook, function (err, result) {
    if (err) throw err;
    res.send(200)
  })
}) 

app.post("/create-shelf/:entityId/:name", (req, res) => {

  var id = 'shelf' + (new Date()).getTime().toString(36)
  var shelfName = req.params.name
  var entityid = req.params.entityId

  var insertShelf = `INSERT INTO shelves (id, entityId, name) VALUES ('${id}', '${entityid}', '${shelfName}')`
  con.query(insertShelf, function (err, result) {
    if (err) throw err;
    res.send(200)
  })
})

app.get("/search-users", (req, res) => { 

  var query = req.query.username

  var searchUser = `SELECT * FROM users WHERE username LIKE '%${query}%'`
  con.query(searchUser, function (err, results) {
    if (err) throw err;
    results.forEach(function(result) {
      delete result.password
    })
    res.send(results)
  })
})

app.get("/search-groups", (req, res) => { 

  var query = req.query.group

  var searchGroups = `SELECT * FROM groups WHERE name LIKE '%${query}%'`
  con.query(searchGroups, function (err, results) {
    if (err) throw err;
    res.send(results)
  })
})

// Server Setup
const port = 5000;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on:', port);