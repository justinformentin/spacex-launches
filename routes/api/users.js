const express = require('express');
const User = require('../../models/Users');
const router = express.Router();
const bcrypt = require('bcryptjs');
const validateUserLogin = require('../../validator/validateUserLogin');
const validateUserRegister = require('../../validator/validateUserRegister');
const keys = require('../../config/key');
const jwt = require('jsonwebtoken');

router.post('/signup', (req, res) => {
  const { error, isValid } = validateUserRegister(req.body);

  if (!isValid) {
    return res.status(400).json(error);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: 'Email does not exist' });
    }
  });

  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err;
      newUser.password = hash;

      newUser
        .save()
        .then(user => res.json(user))
        .catch(err => console.log(err));
    });
  });
});

router.post('/login', (req, res) => {
  const { error, isValid } = validateUserLogin(req.body);
  const password = req.body.password;

  if (!isValid) {
    res.status(400).json(error);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (!user) {
      return res.status(400).json({ emailNotFound: 'Email not found' });
    }

    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = {
          id: user.id,
          name: user.name,
        };

        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 25200,
          },
          (err, token) => {
            res.json({ success: true, token: 'Bearer ' + token });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordIncorrect: 'Password incorrect' });
      }
    });
  });
});

router.get('/userInfo/:id', (req, res) => {
  User.findById(req.params.id)
    .then(user => res.send(user))
    .catch(err => console.log(err));
});

module.exports = router;
