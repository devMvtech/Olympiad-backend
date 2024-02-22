const db = require("../../database");

// Create a quiz
exports.createQuiz = async (req, res, formattedFileUrls) => {
  const { quiz_name, description, level } = req.body;

  try {
    // Check if the quiz_name already exists
    const cover_img = formattedFileUrls.cover_img[0].downloadURL;
    const quizExists = await db.query(
      "SELECT * FROM quizzes WHERE quiz_name = $1",
      [quiz_name]
    );

    if (quizExists.rows.length > 0) {
      return res.status(400).json({
        error: "Quiz with the provided name already exists.",
      });
    }

    await db.query(
      `INSERT INTO quizzes (quiz_name, description, level, cover_img) VALUES ($1, $2, $3, $4)`,
      [quiz_name, description, level, cover_img]
    );

    return res.status(201).json({
      success: true,
      message: "Quiz created successfully",
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

// Get all quizzes
exports.getAllQuizzes = async (req, res) => {
  try {
    const { rows } = await db.query("SELECT * FROM quizzes");

    return res.status(200).json({
      success: true,
      quizzes: rows,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

// Get By Id
exports.getQuizById = async (req, res) => {
  const { id } = req.params;

  try {
    const query = "SELECT * FROM quizzes WHERE quiz_id = $1";
    const values = [id];
    const result = await db.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "Quiz not found.",
      });
    }

    return res.status(200).json({
      success: true,
      quiz: result.rows[0],
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

// Update a quiz
exports.updateQuiz = async (req, res, formattedFileUrls) => {
  const id = req.params.id;
  const { quiz_name, description, level } = req.body;

  try {
    const cover_img = formattedFileUrls.cover_img[0].downloadURL;

    await db.query(
      `UPDATE quizzes SET quiz_name=$1, description=$2, level=$3, cover_img=$4 WHERE quiz_id=$4`,
      [quiz_name, description, level, cover_img, id]
    );

    return res.status(200).json({
      success: true,
      message: "Quiz updated successfully",
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

// Delete a quiz
exports.deleteQuiz = async (req, res) => {
  const id = req.params.id;

  try {
    await db.query("DELETE FROM quizzes WHERE quiz_id=$1", [id]);

    return res.status(200).json({
      success: true,
      message: "Quiz deleted successfully",
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};
