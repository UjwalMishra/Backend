//User routes --> /signin, /signup, /logout, /updateProfile

const express = require("express");
const {
  signupController,
  signinController,
  updateProfileController,
} = require("../controllers/Auth");
const { authMiddleware } = require("../middlewares/auth");
const router = express.Router();

//signup
router.post("/signup", signupController);

//signin
router.post("/signin", signinController);

//update-profile
router.put("/update", authMiddleware, updateProfileController);

module.exports = router;
