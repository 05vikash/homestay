const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const passport = require("passport");
const wrapAsync = require("../utils/wrapAsync.js");
const { savedUrl } = require("../middleware.js");
const UserController=require("../controller/user.js")

router.get("/signup", UserController.getSignUpForm);

router.post(
  "/signup",
  wrapAsync(UserController.createUser)
);

router.get("/login",UserController.getLoginForm);

router.post(
  "/login",savedUrl,
  passport.authenticate("local", {
    failureFlash: true,
    failureRdirect: "/login",
  }),
 UserController.userLogin
);

router.get("/logout", UserController.userLogout);

module.exports = router;
