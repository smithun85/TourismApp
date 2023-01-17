const NodeGeoCoder = require('node-geocoder')

const options = {
    
    provider: "mapquest",
        httpAdapter: 'https' ,
        apiKey: 'pkamZzL0YNDAGw1d3R2ab8WAoE80CRqM',
        formatter: null,

}


const geoCoder = NodeGeoCoder(options)
module.exports=geoCoder

