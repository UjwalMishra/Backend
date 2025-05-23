const express = require("express");
const {
  getBalanceController,
  transferMoneyController,
} = require("../controllers/Account");
const { authMiddleware } = require("../middlewares/auth");

const router = express.Router();

//get balance
router.get("/balance", authMiddleware, getBalanceController);

//transfer money
router.post("/transfer", authMiddleware, transferMoneyController);
module.exports = router;
