const doctorModel = require("../models/doctorModel");
const userModel = require("../models/userModels");

const getAllUserControllers = async (req, res) => {
  try {
    const users = await userModel.find({});
    res.status(200).send({
      success: true,
      message: "users data",
      data: users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while fetching users",
      error,
    });
  }
};

const getAllDoctorContollers = async (req, res) => {
  try {
    const doctors = await doctorModel.find({});
    res.status(200).send({
      success: true,
      message: "Doctors data",
      data: doctors,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      messsage: "error while fetching doctors",
      error,
    });
  }
};

module.exports = { getAllDoctorContollers, getAllUserControllers };
