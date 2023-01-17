import React, { useContext, useState } from 'react'
import { DynamicStar } from 'react-dynamic-star'
import { useResolvedPath } from 'react-router-dom'
import ReviewEdit from './ReviewEdit'

const ReviewRead = ({_id, user, review, rating, name}) => {

    const {users, refresh, setRefresh, ReviewDelete} = useContext()
    // console.log(review)

    const [state, setState] = useState(false)
    const token = JSON.parse(localStorage.getItem('token'))
    // console.log(token)

  return (

    <div className='ReviewRead'>
        {token !== null  ?
        token && state && refresh ? <ReviewEdit data = {review} id ={_id}/> : "" : "" }

        <h3>&nbsp;&nbsp;&nbsp;&nbsp; {name}</h3>

        <div className="comment">
            <DynamicStar rating = {rating} outlined='black' width= '20' height='20'/>
            <p>{review}</p>
            {token !==null ?
            users._id ===user ?
                <div>
                    {token && state & refresh ? 
                    <button className='btnClose' onClick={()=>setState(!state)}>XXXXX</button> : "" }
                    <button
                        onClick={()=>{setState(true) 
                        setRefresh(true)}}
                    >Edit</button>
                    <button 
                        onClick={()=>{ReviewDelete(-id)
                        setRefresh(!refresh)}}
                    >Delete</button>
                </div> 
                : "" : "" }
        </div>
    </div>
  )
}

export default ReviewRead