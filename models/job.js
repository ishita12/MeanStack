const mongoose = require('mongoose'); // Node Tool for MongoDB
mongoose.Promise = global.Promise; // Configure Mongoose Promises
const Schema = mongoose.Schema; // Import Schema from Mongoose
const bcrypt = require('bcrypt-nodejs'); // A native JS bcrypt library for NodeJS



// Validate Function to check username length
const titleLengthChecker = (title) => {
  // Check if username exists
  if (!title) {
    return false; // Return error
  } else {
    // Check length of username string
    if (title.length < 3 || title.length > 15) {
      return false; // Return error if does not meet length requirement
    } else {
      return true; // Return as valid username
    }
  }
};

// Validate Function to check if valid username format
const validTitle = (title) => {
  // Check if username exists
  if (!title) {
    return false; // Return error
  } else {
    // Regular expression to test if username format is valid
    const regExp = new RegExp(/^[a-zA-Z0-9]+$/);
    return regExp.test(title); // Return regular expression test result (true or false)
  }
};

// Array of Username validators
const titleValidators = [
  // First Username validator
  {
    validator: titleLengthChecker,
    message: 'title must be at least 3 characters but no more than 15'
  },
  // Second username validator
  {
    validator: validTitle,
    message: 'title must not have any special characters'
  }
];



// Validate Function to check username length
const companyLengthChecker = (title) => {
  // Check if username exists
  if (!company) {
    return false; // Return error
  } else {
    // Check length of username string
    if (company.length < 3 || company.length > 15) {
      return false; // Return error if does not meet length requirement
    } else {
      return true; // Return as valid username
    }
  }
};

// Validate Function to check if valid username format
const validCompany = (company) => {
  // Check if username exists
  if (!company) {
    return false; // Return error
  } else {
    // Regular expression to test if username format is valid
    const regExp = new RegExp(/^[a-zA-Z0-9]+$/);
    return regExp.test(company); // Return regular expression test result (true or false)
  }
};

// Array of Username validators
const companyValidators = [
  // First Username validator
  {
    validator: companyLengthChecker,
    message: 'company must be at least 3 characters but no more than 15'
  },
  // Second username validator
  {
    validator: validCompany,
    message: 'company must not have any special characters'
  }
];


// Validate Function to check password length
const descriptionLengthChecker = (description) => {
  // Check if username exists
  if (!description) {
    return false; // Return error
  } else {
    // Check length of username string
    if (description.length < 3 || description.length > 500) {
      return false; // Return error if does not meet length requirement
    } else {
      return true; // Return as valid username
    }
  }
};

const descriptionValidators = [
  // First Username validator
  {
    validator: descriptionLengthChecker,
    message: 'description should not be more than 200 characters'
  }
];









  const jobSchema = new Schema({
    title: {type: String},
    company: {type: String},
    description: {type: String},
    deadline: {type: String, default: Date.now()},
    createdBy: {type: String}

    });


module.exports = mongoose.model('Job', jobSchema);
