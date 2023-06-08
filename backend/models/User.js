const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    contactNumber: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          // Regex pattern for a 10-digit phone number
          return /^\d{10}$/.test(value);
        },
        message: 'Contact number must be a 10-digit number',
      },
    },
    department: {
      type: String,
      required: true,
    },
    joiningDate: {
      type: Date,
      default: Date.now,
    },
    role: {
      type: String,
      required: true,
      enum: ['admin', 'employee'],
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const User = mongoose.model('User', userSchema);

module.exports = User;
