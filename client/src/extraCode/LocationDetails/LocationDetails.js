// import React, { useContext, useEffect, useState } from 'react'
// import { AiFillStar } from 'react-icons/ai'
// import './locationDetailsStyle.css';
// import image from '../../Assets/bidar.jpg'
// import Locations from '../../Records/Locations';


// const LocationDetails = () => {

//   const [singleDetailsData, setSingleDetailsData] = useState([])

//   const singleLocation = async () => {
//     const id = JSON.parse(localStorage.getItem("records"))
//     console.log(id)
//     const url = `http://localhost:4000/tours/${id}`
//     const response = await fetch(url);

//     const singleData = await response.json();
//     console.log(response.data)
//     setSingleDetailsData([singleData])
//   }
//   useEffect(() => {
//     singleLocation()
//   }, [])



//   return (
//     <>
//     <div className='locationDetails ' >
//       {singleDetailsData.map((item, i) => {

//         return (
          

//             <div className="imageDetails" key={i}>
//               <div >
//                 <img src={item.imageUrl} />
//               </div>
//               <p>{item.title}</p>
//               <h4>{item.location}</h4>
//               <p>{item.discription}</p>
//               <p>{item.price}</p>
//               <button>Edit karo</button>
//               <button>Delete</button>
//             </div>          
//         )
//       })
//       }
//       </div>
//     </>
//   )
// }

// export default LocationDetails