const express = require('express')
const passport = require('passport')
const mongoose = require('mongoose')
const cors = require("cors");
const bodyParser = require('body-parser')
const Post = require("./models/post")
const Word = require("./models/word")
const User = require("./models/user")
const Dictionary = require("./models/dictionary")
const cookieSession = require('cookie-session')
const session = require("express-session")
const ObjectId = require('mongoose').Types.ObjectId
const querySring = require('querystring')

const LocalStrategy = require('passport-local').Strategy;

app.use(cookieSession({
  name: 'session',
  keys: ['helloworld'],

  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))

app.use(passport.initialize());
app.use(passport.session());


passport.use('login', new LocalStrategy ((username, password, done) => {
  const authenticated = (username === "1" || username === "2" || username === "3" || username === "4" || username === "5" || username === "6") && password === "password";

  let user = new User()

  let date = new Date ()
  let userName = `user${date.getSeconds()}${date.getMilliseconds()}`

  user.userName = userName
  user.userPassword = "12345"

  
  user.userLevel = parseInt(username),
  user.userClozes = []
  user.userDictionary = [],
  user.visited = [],
  dateCreated = date

  user.save()

  if (authenticated) {
    return done(null, { myUser:userName, myID: 1234 });
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

app.post('/login', passport.authenticate('login', {
  successRedirect: '/posts',
  failureRedirect: '/'
}));

app.get("/test", checkAuthentication, (req, res) => {
  res.send("Success")
})