const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

// @desc    Register new user
// @route   POST /auth
// @access  Admin

const registerUser = async (req, res) => {
  const { name, email, contactNumber, department, role, password } = req.body;

  try {
    // Check if the user entered all the details
    if (!name || !email || !contactNumber || !department || !role || !password) {
      return res
        .status(401)
        .json({ message: "Please fill the necessary details" });
    }

    // Check if the user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password and create a new user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    user = new User({
      name, email, contactNumber, department, role,
      password: hashedPassword,
    });
    await user.save();

    // Create a JWT token and return it
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.json({ token, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// @desc    Login a user
// @route   POST /auth/login
// @access  Public

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user entered all the details
    if (!email || !password) {
      return res
        .status(401)
        .json({ message: "Please fill the necessary details" });
    }

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Check if the password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Create a JWT token and return it
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.json({ token, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// @desc    get all employees
// @route   GET /auth/employees
// @access  Private

const getAllEmployees = async (req, res) => {
  try {
    // Fetch the authenticated user's information
    const employees = await User.find({role: "employee"}).select("-password");
    res.json(employees);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// @desc    get my profile
// @route   GET /auth/me
// @access  Private

const getMe = async (req, res) => {
  try {
    // Fetch the authenticated user's information
    const user = await User.findById(req.user.userId).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// @desc    Update my profile
// @route   PUT /auth/me
// @access  Private

const updateMe = async (req, res) => {
  try {
    // Update the authenticated user's information
    const user = await User.findByIdAndUpdate(
      req.user.userId,
      { $set: req.body },
      { new: true }
    ).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// @desc    Get user by id
// @route   GET /auth/users/:id
// @access  Admin

const getById = async (req, res) => {
  try {
    // Fetch the authenticated user's information
    const user = await User.findById(req.params.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// @desc    Update User by id
// @route   PUT /auth/users/:id
// @access  Private

const updateById = async (req, res) => {
  try {
    // Update the authenticated user's information
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    ).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// @desc    Delete User by id
// @route   DELETE /auth/users/:id
// @access  Private

const deleteById = async (req, res) => {
  try {
    // Delete the authenticated user's account
    await User.findByIdAndDelete(req.params.id);
    res.json({ id: req.params.id, message: "User deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getAllEmployees,
  getMe,
  updateMe,
  getById,
  updateById,
  deleteById
};
