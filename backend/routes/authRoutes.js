const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getMe,
  updateMe,
  deleteMe,
} = require("../controllers/authController");

// http://localhost:9000/auth

router.post("/register", registerUser);
router.post("/login", loginUser);
router.route("/me").get(getMe).put(updateMe).delete(deleteMe);

module.exports = router;
