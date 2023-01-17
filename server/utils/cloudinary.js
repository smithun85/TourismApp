const cloudinary = require('cloudinary').v2
const dotenv=require('dotenv');
dotenv.config();

//To configure cloudinary in our project,create a file named cloudinary.config.js
const Cloudinary = () =>{
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME ,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    });
    // console.log()

}

module.exports = Cloudinary