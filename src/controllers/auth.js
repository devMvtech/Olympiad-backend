const db = require("../../database");
const { hash } = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const { SECRET } = require("../constants");

exports.getUsers = async (req, res) => {
  try {
    const { rows } = await db.query(
      "select user_id, username, email, date_of_birth, standard, school, aoi, parents, number, address from users"
    );

    return res.status(200).json({
      success: true,
      users: rows,
    });
  } catch (error) {
    console.log(error.message);
  }
};

exports.register = async (req, res) => {
  const {
    username,
    email,
    password,
    date_of_birth,
    standard,
    school,
    aoi,
    parents,
    number,
    address,
  } = req.body;
  try {
    const hashedPassword = await hash(password, 10);

    await db.query(
      "INSERT INTO users (username, email, password, date_of_birth, standard, school, aoi, parents, number, address) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)",
      [
        username,
        email,
        hashedPassword,
        date_of_birth,
        standard,
        school,
        aoi,
        parents,
        number,
        address,
      ]
    );

    return res.status(201).json({
      success: true,
      message: "The registraion was succefull",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      error: error.message,
    });
  }
};

exports.login = async (req, res) => {
  let user = req.user;

  let payload = {
    id: user.user_id,
    email: user.email,
  };

  try {
    const token = await sign(payload, SECRET);

    return res.status(200).cookie("token", token, { httpOnly: true }).json({
      success: true,
      message: "Logged in succefully",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      error: error.message,
    });
  }
};

exports.protected = async (req, res) => {
  try {
    return res.status(200).json({
      info: "protected info",
    });
  } catch (error) {
    console.log(error.message);
  }
};

exports.logout = async (req, res) => {
  try {
    return res.status(200).clearCookie("token", { httpOnly: true }).json({
      success: true,
      message: "Logged out succefully",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      error: error.message,
    });
  }
};
