
//*******************************Packages**********************************
var mongoose = require('mongoose');

//********************************Schema*********************************
var itemSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  title:{ type: String, required: true },
  description:{type: String, required: true },
  match:{
    keyword1:{
      original:String
    },
    keyword2:{
      original:String
    },
    keyword3:{
      original:String
    }
  }
/*  trade:{
    status:{type:Number, required:true},
    objectMatch:{type:Number, required:true},
    tradeRating:{type:String, required:true}
  }*/
});

// Create the module for users and expose it to our app
module.exports = mongoose.model('Item', itemSchema);
