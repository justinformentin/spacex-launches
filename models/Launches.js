const mongoose = require('mongoose');
// Schema constructor
const Schema = mongoose.Schema;

// Using the Schema constructor, create a new user Schema object
const LaunchSchema = new Schema({
  badge: {
    type: String,
    require: false,
  },
  missionName: {
    type: String,
    require: true,
  },
  rocketName: {
    type: String,
    require: true,
  },
  flightNumber: {
    type: Number,
    require: true,
  },
  rocketType: {
    type: String,
    require: true,
  },
  launchDate: {
    type: String,
    require: true,
  },
  photo: {
    type: String,
    require: false,
  },
});

// This creates our model from the above schema, using mongoose's model method
module.exports = Launch = mongoose.model('Launch', LaunchSchema);
