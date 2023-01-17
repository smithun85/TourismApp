import React, { useContext, useEffect } from 'react';
import { DynamicStar } from 'react-dynamic-star'
import axios from 'axios';
import { Data } from '../../../Context/TourContext'

const SetReviews = ({ tour_id }) => {

  const { reviewData, setRefresh, getReview, toggleupdateReview } = useContext(Data)
  // console.log(toggleupdateReview,1)


  const userToken = JSON.parse(localStorage.getItem("user"));  //setItem() from useSingup.js
  // console.log(userToken.Result._id)
  const { token, Result: { _id } } = userToken

  //DELETE reviews
  const config = {
    headers: {
      Authorization: ` Bearer ${token}`
    }
  }
  const deleteReviews = async (_id) => {
    await axios.delete(`http://localhost:4000/reviews/${_id}`, config)
    getReview()
    setRefresh()
  }
  useEffect(() => {
    getReview()
  }, []);





  return (
    <>
      {
        reviewData.map((item, i) => {
          const { rating, review, name, userId, tourId } = item
          {/* console.log(item,45) */ }
          return (
            <div key={i} className='reviews_rating'>
              {
                tour_id === tourId ?
                  
                  <div>
                    <p><b>Reviews: &nbsp;</b>{review}</p>
                    <div className="rating">
                      <DynamicStar rating={rating} width='30' height='30' />
                    </div>
                    {
                      _id === userId ?
                        <div>
                          <button className='view_card_btn1' onClick={() => toggleupdateReview(item)}>Edit</button>
                          <button className='view_card_btn2' onClick={() => deleteReviews(item._id)}>Delete</button>
                        </div> : ""
                    }


                    <h5><b>Created by:</b>{name}</h5>
                  </div>
                  : ""
                }
            </div>
          )
        })
      }
    </>
  )
}

export default SetReviews