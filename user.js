var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  _id{type: Mixed, required: true}
  firstName: { type: String, required: true },
  middleName: { type: String, required: true },
  lastName: { type: String, required: true },
  dateJoined{ type: Date, default: Date.now},
  dob: { type: Date, required: true },
  address { type: String, required: true },
  rating{ type: Number, required:true}
  accounts{
    facebook{ type: String, required: false },
    google{ type: String, required: false },
  },
  email{ type: String, required: true },
  password { type: Mixed, required: true },
});

module.exports = schema;
