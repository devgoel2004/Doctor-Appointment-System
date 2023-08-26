const userModel = require("../models/userModels");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
//register callback function
const registerController = async (req, res) => {
  try {
    const existingUser = await userModel.findOne({ email: req.body.email });
    if (existingUser) {
      return res
        .status(200)
        .send({ message: `User already exists`, success: false });
    }

    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;
    const newUser = new userModel(req.body);
    await newUser.save();

    res.status(201).send({ message: `Register successfull`, success: true });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send({ success: false, message: `Register controller ${err.message}` });
  }
};

//login callback

const loginController = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(200)
        .send({ message: "user Not found", success: false });
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res
        .status(200)
        .send({ message: "Invalid credentials", success: false });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: `1d`,
    });
    res.status(200).send({ message: "login Success", success: true, token });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: `Error in login ${err.message}` });
  }
};

module.exports = { loginController, registerController };
