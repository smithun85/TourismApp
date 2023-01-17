const authUse = require('../middleware/userMiddleware');

const User = require('../controllers/userController');

const router = require('express').Router();

const {
    createReview,
    getReviewById,
    getAllreview,
    updateReview,
    deleteReview,
    getReviewByTourId
} = require('../controllers/reviewController');



// router.route("/:id").post(createReview)
// .get( getReviewById)
// .patch( updateReview)
// .delete(deleteReview)

//or
router.post("/:id", authUse, createReview)
router.get("/:id", getReviewById)
router.patch("/:id" , authUse, updateReview)
router.delete("/:id", authUse, deleteReview)

router.route("/").get(getAllreview)

router.route("/tour/:id").get(getReviewByTourId)

module.exports =router

