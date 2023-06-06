const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getMe,
  updateMe,
  deleteMe,
} = require("../controllers/authController");
const auth = require("../middlewares/authMiddleware");

// http://localhost:9000/auth

router.post("/register", registerUser);
router.post("/login", loginUser);
router.route("/me").get(auth, getMe).put(auth, updateMe).delete(auth, deleteMe);

module.exports = router;
