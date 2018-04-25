const mongoose = require('mongoose'); // Node Tool for MongoDB
mongoose.Promise = global.Promise; // Configure Mongoose Promises
const Schema = mongoose.Schema; // Import Schema from Mongoose
const bcrypt = require('bcrypt-nodejs'); // A native JS bcrypt library for NodeJS





const timeChecker = (time) => {
  // Check if password exists



    // Check password length
    if (time[0].startTime.length < 1 || comment[0].length > 200) {
      return false; // Return error if passord length requirement is not met
    } else {
      return true; // Return password as valid
    }

};







  const reservationSchema = new Schema({
    username:{type: String},
    roomType: {type: String},
    floor: {type: String},
    room: {type: String},
    date: {type: String},
    time: {type: String}

    });


module.exports = mongoose.model('Reservation', reservationSchema);
