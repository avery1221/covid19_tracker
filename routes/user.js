const express = require("express");
const router = express.Router();
const User = require("../database/models/user.js");
const UserCountry = require("../database/models/usercountry.js");
const passport = require("../passport");

// /user/
router.post("/", (req, res) => {
  console.log("user signup");

  const { username, password } = req.body;
  // ADD VALIDATION
  User.findOne({ username: username }, (err, user) => {
    if (err) {
      console.log("User.js post error: ", err);
    } else if (user) {
      res.json({
        error: `Sorry, already a user with the username: ${username}`,
      });
    } else {
      const newUserCountry = new UserCountry({
        username: username,
        defaultCountry: "US",
      });
      newUserCountry.save((err, savedUser) => {
        if (err) return res.json(err);
      });

      const newUser = new User({
        username: username,
        password: password,
        defaultCountry: "",
      });
      newUser.save((err, savedUser) => {
        if (err) return res.json(err);
        res.json(savedUser);
      });
    }
  });
});

router.post("/country", (req, res) => {
  console.log("save country");

  const { username, defaultCountry } = req.body;
  console.log(username, defaultCountry);
  // ADD VALIDATION
  UserCountry.findOne({ username: username }, (err, user) => {
    if (err) {
      console.log("User.js post error: ", err);
    } else if (user) {
      user.defaultCountry = defaultCountry;
      user.save((err, savedUser) => {
        if (err) return res.json(err);
        res.json(savedUser);
      });
    }
  });
});

// /user/login
router.post(
  "/login",

  passport.authenticate("local"),
  (req, res) => {
    console.log("logged in", req.user);
    var userInfo = {
      username: req.user.username,
    };
    res.send(userInfo);
  }
);

router.get("/country/:user", (req, res) => {
  console.log("Get country");
  const username = req.params.user;
  console.log(username);
  UserCountry.findOne({ username: username }, (err, user) => {
    console.log(user);
    res.json({ defaultCountry: user.defaultCountry });
  });
});

// //user/logout
router.get("/logout", (req, res) => {
  console.log("Logging out...");
  if (req.user) {
    req.logout();
  }
  res.redirect("/");
});

router.get("/", (req, res, next) => {
  console.log("===== user!!======");
  console.log(req.user);
  if (req.user) {
    res.json({ user: req.user });
  } else {
    res.json({ user: null });
  }
});
module.exports = router;
