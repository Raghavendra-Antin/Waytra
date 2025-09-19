const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middlewares.js");

const userController = require("../controllers/users.js");
const user = require("../models/user.js");

router
  .route("/signup")
  .get(userController.renderSignupForm)
  .post(wrapAsync(userController.signup));

router
  .route("/login")
  .get(userController.renderloginForm)
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      //this passport.authenticate logs in the user
      failureRedirect: "/login",
      failureFlash: true,
    }),
    userController.login
  );

router.get("/logout", userController.logout);
module.exports = router;
