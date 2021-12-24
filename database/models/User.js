const {SchemaTypes, Schema, model} = require('../db'); 
const config = require('../../config/config');


let userSchema = new Schema({
  email:{type:SchemaTypes.String, required:true, unique:true}, 
  firstName:{type:SchemaTypes.String},
  lastName:{type:SchemaTypes.String},
  emailAuth:{type:SchemaTypes.Boolean, default:false},
  timeStamp : {type:SchemaTypes.Date, default:Date.now()},
  profilePicture:{type:SchemaTypes.String},

  data:[
      {
          orignalUrl:{type:SchemaTypes.String, required:true, unique:true},
          shortUrl:{type:SchemaTypes.String, required:true},
          timeStamp:{type:SchemaTypes.String, required:true},
      }
  ]
  
});

let userModel = model('User', userSchema);
module.exports = userModel;