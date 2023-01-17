const ReviewModel = require('../Models/reviewModel');
const TourModel = require('../Models/tourModel');


//CREATE/POST review
const createReview = async (req,res) => {
    try{
        const tour = await TourModel.findById(req.params.id);
        console.log(tour)
        if(!tour){
            res.status(401).json({message:"Tour does not exist"})
        }
       
        //get the token in buffer form
        const token = req.headers.authorization; //in this token user information available like email,token,id...of user
        const tokenUserData = JSON.parse(Buffer.from(token.split('.')[1],'base64').toString()) //convert buffer to string then to jSON ooject
        // console.log("" + req.params.id + tokenUserData.id)

        const review = await ReviewModel.create({
            tourReviewId: "" + req.params.id + tokenUserData.id,  //combine useId & tourId
            userId: tokenUserData.id,                          //user's id
            tourId:req.params.id,                        //tour,s id
            name:tokenUserData.fname + " " + tokenUserData.lname,    //user,s name
            review:req.body.review,                      //taking from review's schema
            rating:req.body.rating
        })
        res.status(200).send({
            status: "success",
            data:{
                data:review
            }
        });
    }catch(error){
        res.status(500).json({
            status:"fail",
            message:"failed to create review...",
            error:error.message
        }) 
    }
}




//get review by id
const getReviewById = async (req, res) =>{
    try{
        const review = await ReviewModel.findById(req.params.id)
        // if(!review){
        //     return res.status(401).json({
        //         message:"No review found with given id"
        //     })
        // };
        res.status(200).json({
            status:"success",
            review
        })   
    }catch(error){
        return res.status(401).json({
            message:"No review found with given id",
            error:error
        })
    }
}


//GET all reviews
const  getAllreview = async (req, res) => {
    try{
        const reviews = await ReviewModel.find()
        if(!reviews){
            return res.status(401).json({
                message:"No any reviews found yet "
            })
        };
        res.status(200).json({
            status:"success",
            reviews
        })   
    }catch(error){
        res.status(401).json({
            status:"review failed",
            error:error
        })
    }
};



//UPDATE
const updateReview = async (req,res) =>{
    try{
        const token = req.headers.authorization;
        const tokenUserData = JSON.parse(Buffer.from(token.split('.')[1],'base64').toString()) //decode the token

        const review = await ReviewModel.findById(req.params.id)

        if(tokenUserData.id == review.userId) {                //since=> (userId: tokenUserData.id) in review schema
           const updateReview = await ReviewModel.findByIdAndUpdate(req.params.id,
            {
                review:req.body.review,
                rating: req.body.rating
           },
           {
            new:true,
            // runValidators:true
           })
                   
           res.status(200).json({
            status:"success",           
            updateReview          
            })   
        }else{
            res.status(401).json({
                message:"This review does not belong to you"
            })
        }
    }catch(error){
        res.status(401).json({
            Status:"Update failed",
            error:error.message
        })
    }
};



//DELETE Review
const deleteReview = async (req,res) => {
    // console.log(req)
    try{
        const token = req.headers.authorization;
        const tokenUserData = JSON.parse(Buffer.from(token.split('.')[1],'base64').toString()) //decode the token
        // console.log(tokenUserData)
        const review = await ReviewModel.findById(req.params.id)
            // console.log(review)

        if(tokenUserData.id == review.userId){        //since=> (userId: tokenUserData.id) in review schema
            await ReviewModel.findByIdAndDelete(req.params.id)
           res.status(200).json({
            status:"successfully deleted"
           })
        }else{
            res.status(401).json({
                message:"Id not matched",
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




//GET review by tourID
const getReviewByTourId = async (req, res)=>{
    try{
        const review = await ReviewModel.find();

        const tourReview =await review.map( (item) =>{
            
            const {tourId, review,rating } = item;
            if(req.params.id == tourId){
                return res.status(200).json({
                    message:true,
                    tourId,
                    review,
                    rating
                })
            } else {
                res.status(401).json({
                    message:false
                })
            }
        })
    }catch(error){
        res.status(500).json({
                message:"something comes error",
                error:message.error
            })
    }
}




module.exports = {
    createReview,
    getReviewById,
    getAllreview,
    updateReview,
    deleteReview,
    getReviewByTourId
}