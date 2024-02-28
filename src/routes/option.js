const { Router } = require("express");

const {
  createOption,
  getOptionsForQuestion,
  deleteOption,
} = require("../controllers/option");

// Route
const router = Router();

// quiz
router.post("/create", createOption);

// router.get("/all/:id", getOptionsForQuestion);

router.get("/:id", getOptionsForQuestion);

router.delete("/:id", deleteOption);

module.exports = router;
