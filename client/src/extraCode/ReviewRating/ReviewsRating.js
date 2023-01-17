import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import { Rating } from 'react-simple-star-rating';
import ReviewRead from './ReviewRead';

const ReviewsRating = () => {

    const [rating, setRating] = useState();
    const [comment, setComment] = useState();
    const { reviews, login, ReviewWrite } = useContext();
    // console.log(reviews)

    const handleRating = (rate) => {
        setRating(rate)
    };

    const handleComment = (e) => {
        setComment(e.target.value)
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        const Id = JSON.parse(localStorage.getItem('user'))
        ReviewWrite(comment, rating, Id)
        setComment("")
        setRating(0)
    };

    return (
        <div>

            <label>Write a Review</label> <br />
            <form onSubmit={handleSubmit}>
                <textarea cols="50" rows="10"
                    value={comment}
                    onChange={handleComment}
                ></textarea>
                {login ? <p>Please <Link to="/login">login</Link> or <Link to="/signup">Register</Link> to write a review</p> : ""}
                <Rating
                    onClick={handleRating}
                    ratingValue={rating}
                />
                <button>Submit</button>
            </form>

            <h2>Top Reviews</h2>
            {!reviews || reviews[0] == null ?
                <h1>not Rating</h1> :
                reviews.map((item, i) => {
                    return (
                        <ReviewRead key={i} {...item} />
                    )
                })
            }
        </div>
    )
}

export default ReviewsRating