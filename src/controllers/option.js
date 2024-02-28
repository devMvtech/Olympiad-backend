const db = require("../../database");

// Create an option
exports.createOption = async (req, res) => {
  const { question_id, option_text, is_correct } = req.body;

  try {
    // Insert the option into the database
    await db.query(
      `INSERT INTO options (question_id, option_text, is_correct) VALUES ($1, $2, $3)`,
      [question_id, option_text, is_correct]
    );

    return res.status(201).json({
      success: true,
      message: "Option created successfully",
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

// Read options for a question
exports.getOptionsForQuestion = async (req, res) => {
  const question_id = req.params.id;
  // console.log(question_id);

  try {
    // Retrieve options for the specified question
    const {
      rows,
    } = await db.query("SELECT * FROM options WHERE question_id = $1", [
      question_id,
    ]);

    return res.status(200).json({
      success: true,
      options: rows,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

// Update an option
exports.updateOption = async (req, res) => {
  const option_id = req.params.id;
  const { option_text, is_correct } = req.body;

  try {
    // Update the option in the database
    await db.query(
      `UPDATE options SET option_text=$1, is_correct=$2 WHERE option_id=$3`,
      [option_text, is_correct, option_id]
    );

    return res.status(200).json({
      success: true,
      message: "Option updated successfully",
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

// Delete an option
exports.deleteOption = async (req, res) => {
  const option_id = req.params.id;

  try {
    // Delete the option from the database
    await db.query("DELETE FROM options WHERE option_id=$1", [option_id]);

    return res.status(200).json({
      success: true,
      message: "Option deleted successfully",
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};
