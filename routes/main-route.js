//libraries
const express = require("express");
const router = express.Router();

//controllers
const Greetings = require("../controllers/handlers/initial");
const Accounts = require("../controllers/handlers/account");
const Login = require("../controllers/handlers/login");

//middlewares
const { upload } = require("../controllers/midllewares/profile");

module.exports = router
  //initial
  .get("/", Greetings.initial)

  //login
  .post("/signin", Login.signin)
  .post("/verify/email", Login.options)

  //accounts
  .get("/account/total", Accounts.getCount)
  .get("/account", Accounts.get)
  .post("/account", Accounts.post)
  .post("/account/avatar", upload().single("avatar"), Accounts.profileImage)
  .patch("/account", Accounts.patch);
