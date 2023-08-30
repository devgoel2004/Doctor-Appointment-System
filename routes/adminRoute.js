const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  getAllDoctorContollers,
  getAllUserControllers,
} = require("../controllers/adminControllers");

const router = express.Router();

//GET method
router.get("/getAllUsers", authMiddleware, getAllUserControllers);

router.get("/getAllDoctors", getAllDoctorContollers);

module.exports = router;
