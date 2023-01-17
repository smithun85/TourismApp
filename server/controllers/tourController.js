 
const tourModel = require('../Models/tourModel')
const ReviewModel = require('../Models/reviewModel')

//import mongoose
const mongoose = require('mongoose')

//file-System http
const fs = require('fs')
const cloudinary = require('cloudinary').v2

//Create functions for all CRUD operation


//Create/Post new TourDetails(Record)
const createTourDetails = async (req, res) => {

    //in this token user information available like email,token,id...b/c we pass from sign()
    const token = req.headers.authorization;         
    const tokenUserData = JSON.parse(Buffer.from(token.split('.')[1],'base64').toString()) //convert buffer to string then to jSON ooject
   
    const review = await ReviewModel.findById(req.params.id)
    console.log(review)
    
    if(tokenUserData.id){                                      
        try {
            //add image backend to cloudinary then db
            let imagesData = []
           const images = req.files.image
           for ( let index = 0; index < images.length; index++){
                const imageFile = await cloudinary.uploader.upload(images[index].tempFilePath,{
                    use_filename:true,
                    folder:'tourImage'
                })
                imagesData.push(imageFile.secure_url)
           }
            

            // console.log(imageFile.secure_url)
            const tour = await tourModel.create(
                { 
                    title:req.body.title, 
                    location:req.body.location, 
                    price:req.body.price, 
                    description:req.body.description, 
                    imageUrl:{
                        image:imagesData
                    },
                    userIdForTour:tokenUserData.id,
                });               
                res.status(200).json( tour )                           
        } catch (err) {
            res.status(400).json({
                status:"image not uploaded",
                 error: err.message })
        }
    }else{
        res.status(400).json({ 
            status:"token not found or Login first",
            error: err.message })
    }
}



//GET all tour(Records/Data)
const getTourDetails = async (req, res) => {
    try {
        const tours = await tourModel.find({}).sort({ createdAt: -1 })
        res.status(200).json(tours)
    } catch (err) {
        res.status(400).json({ Error: err.message })
    }
}

//GET a single tour(record/data) (With the help of params:id)
const getTourDetail = async (req, res) => {
    const tour = await tourModel.findById(req.params.id)
        if (!tour) {
            return res.status(404).json({ Error: 'no such any Location' })
        }
     res.status(200).json(tour) 
}



//delete a tour/Data/record
const deleteTourDetails = async (req,res) => {
    const { id } = req.params
    // console.log(req)
    try{
        const token = req.headers.authorization;
        const tokenUserData = JSON.parse(Buffer.from(token.split('.')[1],'base64').toString()) //decode the token
        // console.log(tokenUserData)
        const tour = await tourModel.findById(id)
            // console.log(tour)

        if(tokenUserData.id === tour.userIdForTour){        //since=> (user's Id: tokenUserData.id) in tour schema
            await tourModel.findByIdAndDelete(id)
           res.status(200).json({
            status:"successfully deleted"
           })
        }else{
            res.status(401).json({
                message:"Id not matched or Login first",
                error: error
            })
        }
    }catch(error){
        res.status(401).json({
            status:"Deletion failed",
            error:error.message
        })
    }
}

//update a tour
const updateTourDetails = async (req,res) =>{
    try{
         //add image backend to cloudinary then db
         let imagesData = []
           const images = req.files.image
           for ( let index = 0; index < images.length; index++){
                const imageFile = await cloudinary.uploader.upload(images[index].tempFilePath,{
                    use_filename:true,
                    folder:'tourImage'
                })
                imagesData.push(imageFile.secure_url)
           }
        const token = req.headers.authorization; 
        const tokenUserData = JSON.parse(Buffer.from(token.split('.')[1],'base64').toString()) //decode the token

        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(401).json({ Error: 'No such tour or id' })
        }
        const tour = await tourModel.findById(req.params.id)
        if(tokenUserData.id===tour.userIdForTour) {                //since=> (userId: tokenUserData.id) in tour schema
           const updatetour = await tourModel.findByIdAndUpdate(req.params.id,
            { 
                title:req.body.title, 
                location:req.body.location, 
                price:req.body.price, 
                description:req.body.description, 
                imageUrl:{
                    image:imagesData
                },
            },
           {
            new:true,
           })                  
           res.status(200).json({
            status:"success",           
            updatedtour:updatetour          
            })   
        }else{
            res.status(401).json({
                message:"userId not matched or login first"
            })
        }
    }catch(error){
        res.status(401).json({
            Status:"Update failed",
            error:error.message
        })
    }
};



//export created document
module.exports = {
    createTourDetails,
    getTourDetails,
    getTourDetail,
    deleteTourDetails,
    updateTourDetails
}