const mongoose = require('mongoose'); // Node Tool for MongoDB
mongoose.Promise = global.Promise; // Configure Mongoose Promises
const Schema = mongoose.Schema; // Import Schema from Mongoose
const bcrypt = require('bcrypt-nodejs'); // A native JS bcrypt library for NodeJS





  // Validate Function to check username length
  const chatLengthChecker = (chat) => {
    // Check if username exists
    if (!bochatdy) {
      return false; // Return error
    } else {
      // Check length of username string
      if (chat.length < 3 || chat.length > 500) {
        return false; // Return error if does not meet length requirement
      } else {
        return true; // Return as valid username
      }
    }
  };





  const chatSchema = new Schema({
    profileUsername:{type: String},
    message: {type: String},
    loggedInUser: {type: String},
    sentBy: {type: String}

    });


module.exports = mongoose.model('Chat', chatSchema);
