const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require("passport");
const path = require('path');
require("dotenv").config()
// const db = require('./config/key').MongoURI; //remove for Heroku deployment
const launchRoutes = require('./routes/api/launches');
const userRoutes = require('./routes/api/users');

const app = express();
app.use(bodyParser.json());
const port = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, "client", "build")))

mongoose
  .connect( 'mongodb://localhost:27017/spacex', {useNewUrlParser: true})
  .then( () => console.log('Successfully connected to server'))
  .catch( err => console.log(err))

app.use(cors())
app.use('/api/launches', launchRoutes);
app.use('/api/auth', userRoutes);

app.use(passport.initialize());
require("./config/Passport")(passport);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(port , () => console.log(`Server connected on port ${port}`));