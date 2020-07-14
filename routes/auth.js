const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

if (process.env.NODE_ENV != "production") require("dotenv").config();

router.post("/signup", (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(422).json({ error: "Please add all the feilds." });
  }

  User.findOne({ email })
    .then((savedUser) => {
      if (savedUser) {
        return res
          .status(422)
          .json({ error: "User already exist with that email." });
      }
      bcryptjs
        .hash(password, 12)
        .then((hashedPassword) => {
          const user = new User({
            name,
            email,
            password: hashedPassword,
          });

          user
            .save()
            .then((user) => {
              const { _id, name, email } = user;

              const token = jwt.sign({ _id }, process.env.JWT_SECRET);

              return res.json({
                token,
                user: { _id, name, email },
              });
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/signin", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).json({ error: "Please add Email or Password." });
  }

  User.findOne({ email })
    .then((savedUser) => {
      if (!savedUser) {
        return res.status(422).json({ error: "Invalid Email or Password" });
      }
      bcryptjs
        .compare(password, savedUser.password)
        .then((isMatched) => {
          if (isMatched) {
            const { _id, name, email } = savedUser;

            const token = jwt.sign({ _id }, process.env.JWT_SECRET);

            return res.json({
              token,
              user: { _id, name, email },
            });
          } else {
            return res.status(422).json({ error: "Invalid Email or Password" });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
