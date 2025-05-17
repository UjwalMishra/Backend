//User routes --> /signin, /signup, /logout, /updateProfile

const express = require("express");
const { signupController, signinController } = require("../controllers/Auth");
const router = express.Router();

//signup
router.post("/signup", signupController);

//signin
router.post("/signin", signinController);

//update-profile

module.exports = router;
