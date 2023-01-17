
const mongoose=require("mongoose");
// const bcrypt=require("bcrypt");

const userSchema=mongoose.Schema(
  {
    fname: {
        type: String,
        required: true
    },
    lname: {
      type: String,
      required: true
  },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true
    },
   
  },
    { timestamp:true }

);


//create model(Collection)
const UserModel=new mongoose.model("User",userSchema); //users named Collection created in DB

module.exports=UserModel;