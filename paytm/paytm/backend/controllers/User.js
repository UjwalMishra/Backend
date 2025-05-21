const { signupSchema } = require("../zodSchemas/signup");
const { User } = require("../models/User");
const jwt = require("jsonwebtoken");
const { signinSchema } = require("../zodSchemas/signin");
const bcrypt = require("bcrypt");
const { updateProfileSchema } = require("../zodSchemas/updateProfile");

require("dotenv").config();

const signupController = async (req, res) => {
  try {
    const body = req.body;
    const parsedBody = signupSchema.safeParse(body);
    if (!parsedBody.success) {
      return res.status(400).json({
        success: false,
        msg: "Wrong Inputs",
      });
    }

    const userAlreadyExists = await User.findOne({ userName: body.userName });
    if (userAlreadyExists) {
      return res.status(400).json({
        success: false,
        msg: "Email already taken",
      });
    }
    const hashedPassword = await bcrypt.hash(body.password, 10);

    const user = await User.create({
      userName: body.userName,
      firstName: body.firstName,
      lastName: body.lastName,
      password: hashedPassword,
    });

    const token = jwt.sign(
      {
        userId: user._id,
      },
      process.env.JWT_SECRET
    );

    return res.status(200).json({
      success: true,
      msg: "User signed up successfully",
      userDetails: user,
      token,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: "Internal server error while signing up user",
      err: err,
    });
  }
};

const signinController = async (req, res) => {
  try {
    const body = req.body;
    const parsedBody = signinSchema.safeParse(body);
    if (!parsedBody.success) {
      return res.status(400).json({
        success: false,
        msg: "Wrong Inputs",
      });
    }
    const user = await User.findOne({ userName: body.userName });
    if (!user) {
      return res.status(400).json({
        success: false,
        msg: "User not exists, please signup first",
      });
    }
    const isPasswordValid = await bcrypt.compare(body.password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        msg: "Wrong Password",
      });
    }
    const token = jwt.sign(
      {
        userId: user._id,
      },
      process.env.JWT_SECRET
    );

    return res.status(200).json({
      success: true,
      msg: "Signin successfull",
      token,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: "Internal server error while signing in user",
      err: err,
    });
  }
};

const updateProfileController = async (req, res) => {
  try {
    const body = req.body;
    const parsedBody = updateProfileSchema.safeParse(body);
    if (!parsedBody.success) {
      return res.status(400).json({
        success: false,
        msg: "Wrong Inputs",
      });
    }
    const authHeaders = req.headers.authorization;
    const token = authHeaders.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;
    console.log("id ", userId);
    const updatedUser = await User.findByIdAndUpdate(userId, req.body);
    return res.status(200).json({
      success: true,
      msg: "user details updated successfully",
      updatedUser: updatedUser,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: "Internal server error while signing in user",
      err: err,
    });
  }
};

const findUserController = async (req, res) => {
  try {
    const { val } = req.body;

    const users = await User.find({
      $or: [
        { firstName: { $regex: `.*${val}.*`, $options: "i" } },
        { lastName: { $regex: `.*${val}.*`, $options: "i" } },
      ],
    });
    return res.status(200).json({
      success: true,
      msg: "Users fetched successfully",
      Users: users,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: "Internal server error while signing in user",
      err: err,
    });
  }
};

module.exports = {
  signupController,
  signinController,
  updateProfileController,
  findUserController,
};
