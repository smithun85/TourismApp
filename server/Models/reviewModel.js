const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    tourReviewId:{
        type:String,
        unique:true,
        required:true
    },
    tourId:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    review:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
        min:1,
        max:5,
        required:true
    },
},
{timestamps:true}
);

const Review = new mongoose.model('Review', ReviewSchema)

module.exports = Review