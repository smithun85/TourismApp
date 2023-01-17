//Note:we can directly fetch the API from from one endpoint,we use the data 
//but here we are creating the our own API and it comes under the CORS,this doesn't allow to the browser 
//so we need to import a middleware so we install the CORS here (npm install cors)
//const cors = require('cors)
// app.use(cors()) =>middleware
//or use this proxy=> "proxy": "http://localhost:4000" in package.json file of client(frontend) folder


//create server
const express = require('express');


//express app
const app = express();

const cors = require('cors')

//import the connection
require('./db/connection');
//import the routes
const userRouter = require('./routes/userRoutes');
const tourRouter = require('./routes/tourRoutes');
const reviewRouter = require('./routes/reviewRoutes')

//Cloudinary
const cloudinary = require('./utils/cloudinary')
//temp file
const fileUpload = require('express-fileupload')

//create port for server
const port = process.env.PORT ||  4000

app.use(cors());

// //global middlewares
app.use(express.json()) 
app.use(express.static(__dirname))
app.use(express.urlencoded({extended:true}))

app.use( (req,res,next)=>{
    console.log(req.path, req.method)
    next()
})

//File Upload
app.use(fileUpload({useTempFiles:true}))
cloudinary();

//routes
app.get('/', (req,res)=>{
    res.json({msg:'Welcome to Journery App'})
})


// app.post('/tours', async(req,res)=>{
//     const {image} = req.body
app.use('/users',userRouter) //http://localhost:4000/users/signup
app.use('/tours', tourRouter)  //http://localhost:4000/tours/
app.use('/reviews', reviewRouter) //http://localhost:4000/reviews


app.listen(port, (err)=>{
    if(!err)
    console.log(`Server is running on port: ${port}`)
    else
    console.log(`Error occured. Error: ${err}`)
})