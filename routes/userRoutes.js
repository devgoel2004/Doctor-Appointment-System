const express = require("express");

const {
  loginController,
  registerController,
  authControllers,
  applyDoctorController,
} = require("../controllers/userControllers");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();
//routes
//Login || POST
router.post("/login", loginController);

//Register || POST
router.post("/register", registerController);

//Auth || POST
router.post("/getUserData", authMiddleware, authControllers);

//Apply Doctor || POST
router.post("/apply-doctor", authMiddleware, applyDoctorController);

module.exports = router;
