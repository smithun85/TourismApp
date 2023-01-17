const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
mongoose.connect('mongodb://localhost:27017/Journey') //Journey named DB folder created in mongoDB
.then(()=>{
    console.log(`Connection is established`)
}).catch((err)=>{
    console.log(`error:${err}`)
});
