const mongoose = require('mongoose'); // Node Tool for MongoDB
mongoose.Promise = global.Promise; // Configure Mongoose Promises
const Schema = mongoose.Schema; // Import Schema from Mongoose
const bcrypt = require('bcrypt-nodejs'); // A native JS bcrypt library for NodeJS






  const applicationSchema = new Schema({
    appliedBy: {type: String},
    position: {type: String},
    companyName: {type: String},
    appliedOn: {type: Date, default: Date.now()},
    jobID: {type: String}
    });


module.exports = mongoose.model('Application', applicationSchema);
