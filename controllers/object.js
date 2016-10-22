var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  _id:{type: Mixed, required: true},
  user: { type: String, ref:'user', required: true },
  title:{ type: String, required: true },
  description  {type: String, required: true },
  pictures:[{type:Number,required:false}],
  keyword:[{type:String, required:true}],
  trade{
    status:{type:Number, required:true},
    objectMatch:{type:Number, required:true},
    tradeRating:{type:String, required:true}
  }
});

module.exports = schema;
