//*******************************Packages**********************************
var mongoose = require('mongoose');

//********************************Schema*********************************
var itemSchema = new mongoose.Schema({
  user: { type: String, ref:'user', required: true },
  title:{ type: String, required: true },
  description  {type: String, required: true },
  pictures:[{type:Number,required:false}],

  /*match:{
    keyword1:{

    }
    keyword2:{

    }
    keyword3:{

    }
    keyword4:{

    }
    keyword5:{

    }
  },*/
  trade:{
    status:{type:Number, required:true},
    objectMatch:{type:Number, required:true},
    tradeRating:{type:String, required:true}
  }
});

// Create the module for users and expose it to our app
module.exports = mongoose.model('Item', itemSchema);
