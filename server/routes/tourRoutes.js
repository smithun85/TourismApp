const express = require('express');

const router = express.Router();

// const upload = require('../utils/multer');

//require Controler:import all function of documents
const { 
    getTourDetails,
    getTourDetail,
    createTourDetails,
    deleteTourDetails,
    updateTourDetails,
} = require('../controllers/tourController');
const authUse = require('../middleware/userMiddleware');

//GET all Tourism
router.get('/', getTourDetails)
// router.get('/', ()=>{})

//GET  a single Tourism
router.get('/:id', getTourDetail)

//POST/Create a new Tourism
router.post('/',authUse, createTourDetails)

//DELETE a TourDetails
router.delete('/:id',authUse, deleteTourDetails)

//UPDATE a existing TourDetails
router.patch('/:id' ,authUse, updateTourDetails)

module.exports = router

//Note:We write the logic of routing(CRUD Operation) in new folder named Controllers,we don't write here
