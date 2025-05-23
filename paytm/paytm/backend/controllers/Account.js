const { default: mongoose } = require("mongoose");
const { Account } = require("../models/Account");

const getBalanceController = async (req, res) => {
  try {
    const userId = req.userId;
    const account = await Account.findOne({ userId });
    return res.status(200).json({
      success: true,
      msg: "Balanced fetched successfully",
      balance: account.balance,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: "Internal server error while signing in user",
      err: err,
    });
  }
};

const transferMoneyController = async (req, res) => {
  let session;
  try {
    // Start session and transaction
    session = await mongoose.startSession();
    session.startTransaction();

    const { amount, to } = req.body;

    // Fetch sender's account
    const account = await Account.findOne({ userId: req.userId }).session(
      session
    );
    if (!account || account.balance < amount) {
      await session.abortTransaction();
      await session.endSession();
      return res.status(400).json({
        success: false,
        msg: "Insufficient balance",
      });
    }

    // Fetch receiver's account
    const toAccount = await Account.findOne({ userId: to }).session(session);
    if (!toAccount) {
      await session.abortTransaction();
      await session.endSession();
      return res.status(400).json({
        success: false,
        msg: "Invalid account",
      });
    }

    // Transfer money
    await Account.updateOne(
      { userId: req.userId },
      { $inc: { balance: -amount } }
    ).session(session);

    await Account.updateOne(
      { userId: to },
      { $inc: { balance: amount } }
    ).session(session);

    // Commit and end session
    await session.commitTransaction();
    await session.endSession();

    return res.status(200).json({
      success: true,
      msg: "Balance sent successfully",
    });
  } catch (err) {
    if (session) {
      await session.abortTransaction();
      await session.endSession();
    }

    console.error(err);
    return res.status(500).json({
      success: false,
      msg: "Internal server error during money transfer",
    });
  }
};

module.exports = { getBalanceController, transferMoneyController };
