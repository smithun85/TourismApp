const mongoose = require('mongoose')
const geoCoder =require( '../utils/geoCoder')

const Schema = mongoose.Schema
const tourSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageUrl:{
        image:[String]
    },
    userIdForTour:{
        type:String,
        // required:true
    },

    latLong:{
        type:{
            type:String,
            enum:['Point']
        },
        coordinates:{
            type:[Number],
            index:'2dsphere'
        },
        formattedAddress:String
    }
},
{ timestamps: true }
);

tourSchema.pre('save',async function(next){
    const loc = await geoCoder.geocode(this.location);
    this.latLong = {
        type:'Point',
        coordinates:[loc[0].longitude, loc[0].latitude],
        formattedAddress:loc[0].formattedAddress
    }
})

const tourModel =new mongoose.model('TourDetails',tourSchema)

module.exports = tourModel;





















//install npm
//Cloudinary (npm package to manage Cloudinary inside a node application)
//Express
//Mongoose (to manage MongoDB database)
//Dotnev (to configure and use environment variables).
//Multer (for file upload)

//Cloudinary is a cloud service built using AWS S3 that makes image and video storage and management easy and convenient.

//Process to upload image 
//I would show how to upload images from the front end to the Node server,
// upload this file to Cloudinary and save the generated image_path in our database using mongoose.
// This sample application takes products information
//which includes image from the user and stores this information in the database

 //Step-1: to store the image URL that will be coming from Cloudinary
 //Step-2: we will upload an image from the file input in the browser
 //Step-3: then that image will go to your Cloudinary storage through the API that is given to you by Cloudinary
 //Step-4: If your image is successfully received by Cloudinary it will give you an URL of that image in response
 //Step-5:Then you will send a POST request with that image URL to your MongoDB database to store the image URL

 //Step-6: Now Sending image to Cloudinary and getting back the URL,
 //and then sending the request to the server to save it to database.

 //Before implementing the code to send request to Cloudinary, 
//we need to setup our front-end UI to take the image input and then display it to our web page


 //To create the api endpoints that we will be used to communicate with our database.
