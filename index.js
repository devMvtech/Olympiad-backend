const express = require("express");
const app = express();
const { PORT, CLIENT_URL } = require("./src/constants");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const cors = require("cors");

//import passport middleware
require("./src/middlewares/passport-middleware");

//initialize middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: CLIENT_URL, credentials: true }));
app.use(passport.initialize());

//import routes
const authRoutes = require("./src/routes/auth");
const quizRoutes = require("./src/routes/quiz");
const questionRoutes = require("./src/routes/question");
const optionRoutes = require("./src/routes/option");

//initialize routes
app.use("/api/v1/user", authRoutes);
app.use("/api/v1/quiz", quizRoutes);
app.use("/api/v1/question", questionRoutes);
app.use("/api/v1/option", optionRoutes);

//app start
const appStart = () => {
  try {
    app.listen(PORT, () => {
      console.log(`The app is running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
};

appStart();
