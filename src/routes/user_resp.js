const { Router } = require("express");
const {
  createUserResponse,
  getUserResponsesForQuiz,
  getUserScore,
} = require("../controllers/user_resp");

// Route
const router = Router();

// quiz
router.post("/create", createUserResponse);

router.get("/userAnswer/:user_id/quizzes/:quiz_id", getUserResponsesForQuiz);
router.get("/userScore/:user_id/quizzes/:quiz_id", getUserScore);

module.exports = router;
