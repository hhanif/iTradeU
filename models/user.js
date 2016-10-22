//*******************************Packages**********************************
var mongoose = require('mongoose');

//********************************Schema*********************************
//
var userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  middleName: { type: String, required: true },
  lastName: { type: String, required: true },
  dateJoined: { type: Date, default: Date.now},
  dob: { type: Date, required: true },
  address: { type: String, required: true },
  rating: { type: Number, required:true},
  accounts: {
      local            : {
          email        : String,
          password     : String,
      },
      facebook         : {
          id           : String,
          token        : String,
          email        : String,
          name         : String
      },
      google           : {
          id           : String,
          token        : String,
          email        : String,
          name         : String
      }
  },
});

// Create the module for users and expose it to our app
module.exports = mongoose.model('User', userSchema);
