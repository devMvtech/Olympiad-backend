const db = require("../../database");

// Create a question
exports.createQuestion = async (req, res) => {
  const { quiz_id, question_text, marks, total_correct_opt } = req.body;

  try {
    // Insert the question into the database
    await db.query(
      `INSERT INTO questions (quiz_id, question_text, marks, total_correct_opt) VALUES ($1, $2, $3, $4)`,
      [quiz_id, question_text, marks, total_correct_opt]
    );

    return res.status(201).json({
      success: true,
      message: "Question created successfully",
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

// Get all questions
exports.getAllQuestions = async (req, res) => {
  try {
    // Retrieve all questions from the database
    const { rows } = await db.query("SELECT * FROM questions");

    return res.status(200).json({
      success: true,
      questions: rows,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

// Get question by ID
exports.getQuestionById = async (req, res) => {
  const { id } = req.params;

  try {
    // Query the database to get the question by ID
    const query = "SELECT * FROM questions WHERE quiz_id = $1";
    const { rows } = await db.query(query, [id]);

    if (rows.length === 0) {
      return res.status(404).json({
        error: "Question not found.",
      });
    }

    return res.status(200).json({
      success: true,
      question: rows,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

// Update a question
exports.updateQuestion = async (req, res) => {
  const question_id = req.params;
  const { question_text } = req.body;

  try {
    // Update the question in the database
    await db.query(
      `UPDATE questions SET question_text=$1 WHERE question_id=$2`,
      [question_text, question_id]
    );

    return res.status(200).json({
      success: true,
      message: "Question updated successfully",
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

// Delete a question
exports.deleteQuestion = async (req, res) => {
  const question_id = req.params.id;

  try {
    // Delete the question from the database
    await db.query("DELETE FROM questions WHERE question_id=$1", [question_id]);

    return res.status(200).json({
      success: true,
      message: "Question deleted successfully",
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};
