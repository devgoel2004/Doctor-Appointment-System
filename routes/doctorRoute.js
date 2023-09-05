const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  getDoctorInfoController,
  updateDoctorInfoController,
} = require("../controllers/doctorController");

const router = express.Router();

//POST single DOC INFO
router.post("/getDoctorInfo", authMiddleware, getDoctorInfoController);

//POST UPDATE PROFILE
router.post("/updateProfile", authMiddleware, updateDoctorInfoController);

module.exports = router;
