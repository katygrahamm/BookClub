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
  const authenticated = true0

  if (authenticated) {
    return done(null, { myUser: username, myID: 1234 });
  } else {
    return done(null, false);
  }

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
      res.redirect("/");
  }
}

app.post('/signup', (req,res) => {
  console.log(req.body)
  let username = req.body.newUsername
  let password = req.body.newPassword
  let date = new Date().toISOString().slice(0, 19).replace('T', ' ');
  let image = faker.image.avatar()

  var insertQuery = `INSERT INTO users (id, username, password, date_created, profile_pic) VALUES (202, '${username}', '${password}', '${date}', '${image}')`
  con.query(insertQuery, function (err, result) {
    if (err) throw err;
    res.send(result.insertId);
  })


})

app.post('/login', passport.authenticate('login', {
  successRedirect: '/posts',
  failureRedirect: '/'
}));

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
const port = 5000;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on:', port);