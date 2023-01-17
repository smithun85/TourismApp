
const jwt=require("jsonwebtoken");

const dotenv=require('dotenv');
dotenv.config();

const createToken = ( email,id ) => {
  
      // return jwt.sign({email:user.email,id:user._id}, process.env.JWT_SECRET, {
      return jwt.sign({email,id}, process.env.JWT_SECRET, {
        expiresIn:"1h"
    });

}

module.exports = createToken;