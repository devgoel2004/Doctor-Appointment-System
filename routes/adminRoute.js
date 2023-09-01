const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  getAllDoctorContollers,
  changeAccountStatusControllers,
  getAllUserControllers,
} = require("../controllers/adminControllers");

const router = express.Router();

//GET method
router.get("/getAllUsers", authMiddleware, getAllUserControllers);

router.get("/getAllDoctors", authMiddleware, getAllDoctorContollers);

//POST account status
router.post(
  "/changeAccountStatus",
  authMiddleware,
  changeAccountStatusControllers
);

module.exports = router;
