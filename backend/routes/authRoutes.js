const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getMe,
  updateMe,
  getAllEmployees,
  getById,
  updateById,
  deleteById,
} = require("../controllers/authController");
const {auth, isAdmin} = require("../middlewares/authMiddleware");

// http://localhost:9000/auth

router.post("/register", isAdmin, registerUser);
router.post("/login", loginUser);
router.get("/employees", isAdmin, getAllEmployees);
router.route("/me").get(auth, getMe).put(auth, updateMe)
router.route("/users/:id").get(isAdmin, getById).put(isAdmin, updateById).delete(isAdmin, deleteById);

module.exports = router;
