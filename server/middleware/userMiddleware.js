
const jwt = require("jsonwebtoken");
const UserModel = require("../Models/UserModel");

const authUse = async (req, res, next) => {
    const { authorization } = req.headers;   //token is generally passed in the header of the request due to security reasons
     let token;
    // if (!authorization ) {
    //     return res.status(401).json({ error: "Auth token require!" })
    // }
    if(authorization && authorization.startsWith("Bearer")){
         token = authorization.split(" ")[1]; //this gives token
        // console.log(req.headers.authorization,1)
    }else{
        return res.status(401).json({ error: "Auth token require! or please login or signup first" })
    }
   
    try {
        jwt.verify(token, process.env.JWT_SECRET, (error)=>{
            if(error){
                console.log(error)
            }
        });   //verify the token
        // req.user = await UserModel.findOne(req.params.id ).select("_id");
        next();
    } catch (error) {
        res.status(401).json({ error: "Request is not Authorized!" })
    }

}

module.exports = authUse;



