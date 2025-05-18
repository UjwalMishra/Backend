const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    trim: true,
    maxLength: 50,
    required: true,
  },
  lastName: {
    type: String,
    trim: true,
    maxLength: 50,
    required: true,
  },
  password: {
    type: String,
    trim: true,
    minLength: 6,
    required: true,
  },
  userName: {
    type: String,
    trim: true,
    unique: true,
    lowercase: true,
    minLength: 4,
    maxLength: 50,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = { User };
