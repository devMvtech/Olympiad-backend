const db = require("../../database");

// Create a user response
exports.createUserResponse = async (req, res) => {
  const { quiz_id, option_ids, user_id } = req.body;

  try {
    // Iterate over each option ID in the array
    for (const option_id of option_ids) {
      // Retrieve the correct option from the options table
      const {
        rows: correctOptions,
      } = await db.query(
        `SELECT is_correct, question_id FROM options WHERE option_id = $1`,
        [option_id]
      );

      if (correctOptions.length === 0) {
        return res.status(400).json({
          success: false,
          message: "Invalid option ID",
        });
      }

      const is_correct = correctOptions[0].is_correct;
      const question_id = correctOptions[0].question_id;

      // Insert the user response into the user_responses table
      await db.query(
        `INSERT INTO user_responses (quiz_id, question_id, option_id, user_id, is_correct) VALUES ($1, $2, $3, $4, $5)`,
        [quiz_id, question_id, option_id, user_id, is_correct]
      );
    }

    return res.status(201).json({
      success: true,
      message: "User responses recorded successfully",
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

// Get all user responses for a user and quiz
exports.getUserResponsesForQuiz = async (req, res) => {
  const { user_id, quiz_id } = req.params;

  try {
    // Retrieve user responses for the specified user and quiz
    const {
      rows,
    } = await db.query(
      "SELECT * FROM user_responses WHERE user_id = $1 AND quiz_id = $2",
      [user_id, quiz_id]
    );

    return res.status(200).json({
      success: true,
      user_responses: rows,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};
