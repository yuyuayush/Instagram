const bodyParser = require('body-parser');
const express = require('express');
const expressSession = require('express-session');
const passport = require('passport');
const path = require("path");
const app =express();
const mongoose= require("mongoose");
const userRouter = require("./routes/users");
const postRouter = require("./routes/posts");
require('./connection/conn');
// body parser --> 

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(expressSession({
    secret: 'your_secret_key', // Replace with a secret key for session data encryption
    resave: false,
    saveUninitialized: false,
  }));  // it allow to save data;
  app.use(userRouter);
  app.use(postRouter);

  app.use(require("./routes/index"))
  app.set("view engine","ejs");
  app.set('views',path.join(__dirname , "views"));
  app.use(express.static(__dirname + '/public'));
  


app.listen(3000,()=>{
    console.log(`server is started running at 3000`);
})