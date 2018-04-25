const mongoose = require('mongoose'); // Node Tool for MongoDB
mongoose.Promise = global.Promise; // Configure Mongoose Promises
const Schema = mongoose.Schema; // Import Schema from Mongoose
const bcrypt = require('bcrypt-nodejs'); // A native JS bcrypt library for NodeJS





  // Validate Function to check e-mail length
   titleLengthChecker = (title) => {
    // Check if e-mail exists
    if (!title) {
      return false; // Return error
    } else {
      // Check the length of e-mail string
      if (title.length < 5 || title.length > 50) {
        return false; // Return error if not within proper length
      } else {
        return true; // Return as valid e-mail
      }
    }
  };

  // Validate Function to check if valid e-mail format
  const alphaNumericTitleChecker = (title) => {
    // Check if e-mail exists
    if (!title) {
      return false; // Return error
    } else {
      // Regular expression to test for a valid e-mail
      const regExp = new RegExp(/^[a-zA-Z0-9]+$/);
      return regExp.test(title); // Return regular expression test results (true or false)
    }
  };

  const titleValidators = [
    // First Email Validator
    {
      validator: titleLengthChecker,
      message: 'Title must be at least 5 characters but no more than 50'
    },
    // Second Email Validator
    {
      validator: alphaNumericTitleChecker,
      message: 'Must be a valid title'
    }
  ];

  // Validate Function to check username length
  const bodyLengthChecker = (body) => {
    // Check if username exists
    if (!body) {
      return false; // Return error
    } else {
      // Check length of username string
      if (body.length < 3 || body.length > 500) {
        return false; // Return error if does not meet length requirement
      } else {
        return true; // Return as valid username
      }
    }
  };



  // Array of Username validators
  const bodyValidators = [
    // First Username validator
    {
      validator: bodyLengthChecker,
      message: 'body must be at least 3 characters but no more than 500'
    }
  ];


  // Validate Function to check password length
  const commentLengthChecker = (comment) => {
    // Check if password exists
    if (!comment[0]) {
      return false; // Return error
    } else {
      // Check password length
      if (comment[0].length < 1 || comment[0].length > 200) {
        return false; // Return error if passord length requirement is not met
      } else {
        return true; // Return password as valid
      }
    }
  };

  const commentValidators = [
    // First Username validator
    {
      validator: commentLengthChecker,
      message: 'comments should not be more than 200 characters'
    }
  ];




  const blogSchema = new Schema({
    selectedCategory: {type: String, required: true},
    title:{type: String, required: true, validate: titleValidators},
    body: {type: String, required: true, title: bodyValidators},
    createdBy: {type: String},
    createdAt: {type: Date, default: Date.now()},
    likes: {type: Number, default: 0},
    likedBy: {type: Array},
    dislikes: {type: String, default:0},
    dislikedBy: {type: Array},
    comments: [
      {
        comment: {type: String, validate: commentValidators},
        commentator: {type: String}
      }
    ]

    });


module.exports = mongoose.model('Blog', blogSchema);
