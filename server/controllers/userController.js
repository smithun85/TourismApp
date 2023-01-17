const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const UserModel = require('../Models/UserModel');
// const createToken = require("../utils/token")



//signup
 const signup = async (req, res) => {

    const {fname, lname, email, password } = req.body;

    try {
        const existUser = await UserModel.findOne({ email });

        if (existUser) {
            return res.status(400).json({ message: "User already exists" })
        }

        //create password encrypted
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt);

        //create Document/Object( create new user)
        const result = await UserModel.create({     
            fname,
            lname,
            email,
            password: hashedPassword,
           
        }) ;

        //create token
        const token = jwt.sign({email: result.email,  id: result._id, fname:result.fname, lname:result.lname },  process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({result, token})
        // const token = createToken(_id)
        // res.status(200).json({ email, password, token })
        // res.status(200).json({ email, result})

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

//login
const login = async (req, res) => {
    const {email, password} = req.body; //this data is passing by user

    try{
        //find user
        const existUser = await UserModel.findOne({ email }); //{email} ==means==> {email(database):email(user)} (bith variable are same so we write a single only)
        if (!existUser){ 
            return res.status(400).json({ message: "User doedn't exists" });
        } ;

        //validate password
        const isPasswordCorrect = await bcrypt.compare(password, existUser.password)
        if(!isPasswordCorrect){
            return res.status(404).json({message:"Incorrect Password"});
        };

        //create token
        const token = jwt.sign({email:existUser.email, id:existUser._id, fname:existUser.fname, lname:existUser.lname}, process.env.JWT_SECRET,{ expiresIn:"1h"});
        //send response
        res.status(200).json( { Result:existUser, token } )
        // const token = createToken(user._id)
        // res.status(200).json({ email, password, token})

    }catch(error){
        res.status(500).json({ message: error.message })
    }
}


module.exports = { signup, login };