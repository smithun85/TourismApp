import React, {useState} from 'react'
import {Rating} from 'react-simple-star-rating'

const ReviewEdit = ({data,id}) => {

    const [rating, setRating] = useState(0);

    const [comment, setComment ] = useState(data)
    console.log(data, id);

    const handleRating = (rate)=>{
        setRating(rate)
    };

    const submitReview = (e) =>{
        e.preventDefault()
        EditReview(id,comment,rating)
    };

    const handleComment = (e) => {
        setComment(e.target.value)
    };

  return (
    <div className='editReview'>
    
        <form onSubmit={submitReview}>
            <div>
                <label >Old Review</label>
                    <textarea name="" id="" cols="50" rows="5" 
                        value={comment}
                        onChange={handleComment} >
                    </textarea>
            </div>

            <div>
                <Rating
                    size = '24px'
                    onClick={handleRating}
                    ratingValue = {rating}>
                </Rating>
            </div>

            <button>Update Review</button>
        </form>
    </div>
  )
}

export default ReviewEdit