const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const passport = require("passport");
const wrapAsync = require("../utils/wrapAsync.js");

router.get("/signup", (req, res) => {
  res.render("users/signup.ejs");
});

router.post(
  "/signup",
  wrapAsync(async (req, res) => {
    let { username, email, password } = req.body;
    let user = new User({ username, email });
    let newUser = await User.register(user, password);
    req.flash("success", "successfully registered");
    res.redirect("/listing");
  })
);

router.get("/login", (req, res) => {
  res.render("users/login.ejs");
});

router.post(
  "/login",
  passport.authenticate("local", {
    failureFlash: true,
    failureRdirect: "/login",
  }),
  async (req, res) => {
    req.flash("success", "successfully logged in");
    res.redirect("/listing");
  }
);

router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "you are logged out successfully");
    res.redirect("/listing");
  });
});

module.exports = router;
