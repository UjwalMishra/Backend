const mongoose = require("mongoose");
require("dotenv").config();

exports.dbConnect = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Db connected");
  } catch (err) {
    console.log("Error while connecting db", err);
  }
};
