const mongoose=require('mongoose')

//User schema
const userSchema=new moongose.Schema({
firstName:{
  type:String,
  required:true,
},
lastName:{
  type:String,
  required:true,
},
userName:{
  type:String,
  required:true,
  minLength:4,
  maxLenght:20,
  unique:true
},
password:{
  type:String,
  required:true,
  minLength:8,
  maxLenght:20,
},
profileImage:{
  type:String,
},
isAdmin:{
  type:Boolean,
  required:true
}
},{timestamps: true}),

//User model
const User=moongose.model("User",userSchema)

//export model
module.exports = User
