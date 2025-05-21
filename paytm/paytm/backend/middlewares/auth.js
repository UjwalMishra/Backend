const jwt = require("jsonwebtoken");

require("dotenv").config();

const authMiddleware = (req, res, next) => {
  const authHeaders = req.headers.authorization;
  if (!authHeaders || !authHeaders.startsWith("Bearer")) {
    return res.status(403).json({
      success: false,
      msg: "Please send token with req",
    });
  }

  const token = authHeaders.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.userId) {
      req.userId = decoded.userId;
      next();
    } else {
      return res.status(403).json({
        success: false,
        msg: "token not have userId || wrong token",
      });
    }
  } catch (err) {
    return res.status(403).json({
      success: false,
      msg: err,
    });
  }
};

module.exports = { authMiddleware };
