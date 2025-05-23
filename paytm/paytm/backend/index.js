const express = require("express");
const { dbConnect } = require("./config/dbConnect");
const cors = require("cors");
//importing routes
const authRoutes = require("./routes/User");
const accountRoutes = require("./routes/Account");
const app = express();

//middlewares
app.use(express.json());
app.use(cors());

//db connection
dbConnect();

//routes
app.use("/api/v1/user", authRoutes);
app.use("/api/v1/account", accountRoutes);

const PORT = process.env.PORT;
app.listen(PORT || 3000, () => {
  console.log("App is running on", PORT);
});
