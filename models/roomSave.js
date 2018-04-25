const mongoose = require('mongoose'); // Node Tool for MongoDB
mongoose.Promise = global.Promise; // Configure Mongoose Promises
const Schema = mongoose.Schema; // Import Schema from Mongoose
const bcrypt = require('bcrypt-nodejs'); // A native JS bcrypt library for NodeJS






  const roomSave = new Schema({
    rtype: {type: String},
    floor: {type: String},
    date: {type: String},
    room:{type: Number},
    time: {type: String}
    });


module.exports = mongoose.model('Room', roomSave);
