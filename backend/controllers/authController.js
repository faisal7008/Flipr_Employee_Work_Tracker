const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const aws = require('aws-sdk');

// Configure AWS SDK
aws.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

// @desc    Register new user
// @route   POST /auth
// @access  Admin

const registerUser = async (req, res) => {
  const { name, email, contactNumber, status, department, role, password } = req.body;

  try {
    // Check if the user entered all the details
    if (!name || !email || !contactNumber || !department || !role || !password) {
      return res.status(401).json({ message: 'Please fill the necessary details' });
    }

    // Check if the user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password and create a new user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    user = new User({
      name,
      email,
      contactNumber,
      department,
      role,
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
      return res.status(401).json({ message: 'Please fill the necessary details' });
    }

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check if the user is inactive
    if (user.status === 'inactive') {
      return res.status(401).json({ message: 'Your account is currently inactive' });
    }

    // Check if the password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
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
    const employees = await User.find({ role: 'employee' });
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
    const user = await User.findById(req.user.userId).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// @desc    Update my profile
// @route   PUT /auth/me
// @access  Private

const comparePasswords = (password, hashedPassword) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hashedPassword, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

const updateMe = async (req, res) => {
  try {
    const { name, contactNumber, department, password, newPassword } = req.body;
    const user = await User.findById(req.user.userId);

    if (name) {
      user.name = name;
    }
    if (contactNumber) {
      user.contactNumber = contactNumber;
    }
    if (department) {
      user.department = department;
    }
    let passwordMsg = null;
    if (password && newPassword) {
      let passwordMatch = false;
      passwordMatch = await comparePasswords(password, user.password);
      if (passwordMatch) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        user.password = hashedPassword;
        passwordMsg = 'Password updated succesfully!';
      } else {
        return res.status(403).json({ passwordError: 'Current Password does not match!' });
      }
    }
    await user.save();
    return res.status(200).json({ user, message: 'Profile updated', passwordMsg });
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
    const user = await User.findById(req.params.id).select('-password');
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
    const { name, contactNumber, department, status } = req.body;
    // Update the authenticated user's information
    const user = await User.findById(req.params.id);
    if (name) {
      user.name = name;
    }
    if (contactNumber) {
      user.contactNumber = contactNumber;
    }
    if (department) {
      user.department = department;
    }
    // if(status){
    user.status = status;
    // }
    await user.save();
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
    res.json({ id: req.params.id, message: 'User deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// Create an instance of the S3 service
const s3 = new aws.S3();

// Controller to handle profile picture upload
const uploadProfilePic = async (req, res) => {
  try {
    const { deleteProfilePic } = req.body;
    const { userId } = req.user;

    if (deleteProfilePic === true) {
      // delete the user's profile picture in the database
      const updatedUser = await User.findByIdAndUpdate(userId, { profilePic: '' }, { new: true });

      return res
        .status(200)
        .json({ message: 'Profile picture deleted successfully', user: updatedUser });
    }

    const { profilePic } = req.files;
    // Generate a unique key for the file
    const fileName = userId;

    // Set the parameters for S3 upload
    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME + '/profile',
      Key: fileName,
      Body: profilePic.data,
      // ACL: 'public-read', // Set the file's access control to public read
    };

    // Upload the file to S3
    const uploadResult = await s3.upload(params).promise();

    // Get the S3 URL of the uploaded file
    const fileUrl = uploadResult.Location;

    // Update the user's profile picture in the database
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: fileUrl },
      { new: true },
    );

    return res
      .status(200)
      .json({ message: 'Profile picture uploaded successfully', user: updatedUser });
  } catch (error) {
    console.error('Error uploading profile picture:', error);
    return res.status(500).json({ error: 'Error uploading profile picture' });
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
  deleteById,
  uploadProfilePic,
};
