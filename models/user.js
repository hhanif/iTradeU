//*******************************Packages**********************************
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

//********************************Schema*********************************
//
var userSchema = new mongoose.Schema({
  _id{type: Mixed, required: true}
  firstName: { type: String, required: true },
  middleName: { type: String, required: true },
  lastName: { type: String, required: true },
  dateJoined{ type: Date, default: Date.now},
  dob: { type: Date, required: true },
  address { type: String, required: true },
  rating{ type: Number, required:true}
  accounts{
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
      twitter          : {
          id           : String,
          token        : String,
          displayName  : String,
          username     : String
      },
      google           : {
          id           : String,
          token        : String,
          email        : String,
          name         : String
      }
  },
});

// *********************************Methods**********************************
// Generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// Checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// Create the module for users and expose it to our app
module.exports = mongoose.model('User', userSchema);
