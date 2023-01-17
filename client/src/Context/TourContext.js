import React, { createContext, useState, } from 'react'
import axios from 'axios'
import { useAuthContext } from '../Hooks/useAuthContext';  
 
export const Data = createContext();

const TourContext = ({children}) => {

  const { user } =useAuthContext()



    //GET Request State:
    const [tours, setTours] = useState(null)
    //GET Request function:
    const getTours = async () => {
        const response = await axios.get('http://localhost:4000/tours');
        // console.log(response)
        const data = response.data;
        setTours(data)
    }


    //POST REQUEST FUNCTION
    const [form, setForm] = useState({
      title: "",
      location: "",
      price: "",
      description: "",
      // imageUrl:[]
  })
  
   //DELETE REQUEST FUNCTION
   const deletetour = async (_id) => {
    await axios.delete(`http://localhost4000/tours/${_id}`, {
    headers:{ 
           Authorization : ` Bearer ${user.token}`
        }
    });
    getTours()
}

//UPDATE REQUEST STATE
const [updateForm, setUpdateForm] = useState({
  _id: null,
  title: "",
  location: "",
  price: "",
  description: "",
  imageUrl: []
})

// Error msg
const [error,setError] = useState(null)

const toggleUpdateTour = (item) => {
  setUpdateForm({
      _id: item._id,
      title: item.title,
      location: item.location ,
      price: item.price,
      description: item.description,
      imageUrl: item.imageUrl
  })
}



//Reviews & Rating:
//GET reviews & Rating

const [reviewData, setReviewData] = useState([])
const getReview = async () => {
  const response = await fetch(`http://localhost:4000/reviews`)  //extraadd:${tourItemId} 
  const data = await response.json();
  // console.log(data,10)
  setReviewData(data.reviews)
}


//UPDATE 
const [updateReviews,setUpdateReviews] =useState({
  _id:null,
  review:"",
  rating:""
})
const toggleupdateReview = (item) => {
  setUpdateReviews({
    _id:item._id,
    review:item.review,
  })
}
 
  return (
    <>
       <Data.Provider value={
        {
          tours, setTours, 
          getTours, 
          form, setForm, 
          deletetour, 
          updateForm, setUpdateForm ,
          toggleUpdateTour,
          error, setError,
          reviewData,setReviewData,
          getReview,
          updateReviews,setUpdateReviews,
          toggleupdateReview
          }
          }>
            { children }
       </Data.Provider>
    </>
  )
}

export default TourContext