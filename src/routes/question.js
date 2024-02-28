const { Router } = require("express");

const {
  createQuiz,
  getAllQuizzes,
  deleteQuiz,
  getQuizById,
  updateQuiz,
} = require("../controllers/quiz");
const {
  createQuestion,
  updateQuestion,
  getAllQuestions,
  getQuestionById,
  deleteQuestion,
} = require("../controllers/question");

// Route
const router = Router();

// quiz
router.post("/create", createQuestion);

router.put("/update/:id", updateQuestion);

router.get("/all/:id", getQuestionById);
router.get("/", getAllQuestions);

router.delete("/:id", deleteQuestion);

module.exports = router;
