const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv').config();
const authRouter = require('./routes/authRoutes');
const taskRouter = require('./routes/taskRoutes');
const fileUpload = require("express-fileupload");

const app = express();

// cors
app.use(cors({ origin: true, credentials: true }));

// Init Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// File Uploading Middleware
app.use(fileUpload());

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose
      .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
      })
      .then(() => {
        console.log('MongoDB is Connected...');
        // Start server
        app.listen(process.env.PORT || 9000, () => console.log('Server started'));
      })
      .catch((err) => console.log(err));
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

connectDB();

// Routes
app.use('/auth', authRouter);
app.use('/task', taskRouter);
