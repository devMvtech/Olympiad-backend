const express = require("express");
const app = express();
const { PORT, CLIENT_URL } = require("./constants");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const cors = require("cors");

//import passport middleware
require("./middlewares/passport-middleware");

//initialize middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: CLIENT_URL, credentials: true }));
app.use(passport.initialize());

//import routes
const authRoutes = require("./routes/auth");
const quizRoutes = require("./routes/quiz");
// const chemRoutes = require("./routes/chem_course");
// const phyRoutes = require("./routes/phy_course");

//initialize routes
app.use("/api/v1/user", authRoutes);
app.use("/api/v1/quiz", quizRoutes);
// app.use("/api/v1/chemistry", chemRoutes);
// app.use("/api/v1/physics", phyRoutes);

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
