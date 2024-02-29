const { Router } = require("express");
const {
  createUserResponse,
  getUserResponsesForQuiz,
} = require("../controllers/user_resp");

// Route
const router = Router();

// quiz
router.post("/create", createUserResponse);

router.get("/user/:user_id/quizzes/:quiz_id", getUserResponsesForQuiz);

module.exports = router;
