import './AddLocationStyle.css';
import React, { useContext, useState } from 'react'
import axios from 'axios';
import { Data } from '../../Context/TourContext';
import Navbar from '../../Components/Navbar/Navbar';
import { useNavigate } from 'react-router-dom'

const AddLocation = () => {

  const {
    form, setForm,
    error, setError,
    updateForm, setUpdateForm
  } = useContext(Data)
  // console.log(form,15)

  const navigate = useNavigate()

  //taking user data from token
  const userToken = JSON.parse(localStorage.getItem("user"));  //setItem() from useSingup.js
  const { token } = userToken
  const config = {
    headers: {
      Authorization: ` Bearer ${token}`
    }
  }

  
 // CREATE form function: Post the data
  const updateFormField = (e) => {
    const { name, value } = e.target
    setForm({ 
      ...form,
      [name]: value 
    })
  }

  const [image, setImage] = useState([])
  const setImageUrl = (e) => {
    const file = e.target.files
    setImage(file)
  }
// POST function
  const createTour = async (e) => {
    e.preventDefault();

    const formData = new FormData()
    for(let index = 0; index < image.length; index++){
      formData.append("image", image[index])
    }
   
    const {title,location,price,description} = form
   
    formData.append("title", title);
    formData.append("location", location);
    formData.append("price",price);
    formData.append("description", description);
    // formData.append("imageUrl", image.imageUrl)
    

    const response = await axios.post('http://localhost:4000/tours', formData, config)
    navigate("/locations")
    // console.log(response,1234)
    // console.log(form) 

    setForm({
      title: "",
      location: "",
      price: "",
      description: "",
      // imageUrl:""
    
    })
    setError(null)
  }


  //Update the Data
  const handleUpdateFieldChange = (e) => {
    const { name, value } = e.target
     setUpdateForm({ ...updateForm, [name]: value })
  }
 
  const updateTour = async (event) => {
    event.preventDefault();

    const formData = new FormData()
    for(let index = 0; index < image.length; index++){
      formData.append("image", image[index])
    }

    const {_id,title,location,price,description} = updateForm;
    

    formData.append("title", title);
    formData.append("location", location);
    formData.append("price",price);
    formData.append("description", description);
    // formData.append("imageUrl", image.imageUrl)
    //Updated data send into DB
    await axios.patch(`http://localhost:4000/Tours/${_id}`, formData, config);
    navigate("/locations")

    //clear the field after updating the value
    setUpdateForm({
      _id: null,
      title: "",
      location: "",
      price: "",
      description: "",
      // imageUrl: ""
    })
  }

  return (
    <>
      <Navbar />
      {/*Create form to Post the form data */}
      {
        !updateForm._id &&  
        ( <div className='totalForm'>
        <h1>Add a new Locations</h1>
        <form className='addLocation' onSubmit={createTour}>

          <div>
            <label>Title:</label><br />
            <input type="text" placeholder='Enter The Title Of Location' name='title' value={form.title} onChange={updateFormField} />
          </div>

          <div className='Location'>
            <div><label>Location</label><br />
              <input type="text" placeholder='Serch For Location' name='location' value={form.location} onChange={updateFormField} />
            </div>
            <div>
              <label>Location Price</label><br />
              <input type="tel" placeholder='Enter The Price' name='price' value={form.price} onChange={updateFormField} />
            </div>
          </div>
          <div>
            <label>Description</label><br />
            <input type="text" placeholder='Enter the Desc Of Location' name='description' value={form.description} onChange={updateFormField} />
          </div>

          <div className="field">
            <label>Upload Image: </label>
            <input multiple type="file" name='image' value={form.image} onChange={setImageUrl} />
          </div>
          <button className='anchor'>Add Location</button>

          {error && <div className='error'>{error}</div>}
        </form>
      </div>)  
        
      }


      {/* Update form to update the form Data */}
      
       {
        updateForm._id && ( <div className='totalForm'>
        <h1>Update your Locations Details</h1>
        <form className='addLocation' onSubmit={updateTour}>

          <div>
            <label>Title:</label><br />
            <input type="text" placeholder='Enter The Title Of Location' name='title' value={updateForm.title} onChange={handleUpdateFieldChange} />
          </div>

          <div className='Location'>
            <div><label>Location</label><br />
              <input type="text" placeholder='Serch For Location' name='location' value={updateForm.location} onChange={handleUpdateFieldChange} />
            </div>
            <div>
              <label>Location Price</label><br />
              <input type="tel" placeholder='Enter The Price' name='price' value={updateForm.price} onChange={handleUpdateFieldChange} />
            </div>
          </div>
          <div>
            <label>Description</label><br />
            <input type="text" placeholder='Enter the Desc Of Location' name='description' value={updateForm.description} onChange={handleUpdateFieldChange} />
          </div>

          <div className="field">
            <label>Upload Image: </label>
            <input multiple type="file" name='image' value={updateForm.image} onChange={setImageUrl} />
          </div>
          {
            image.imgPrevious != null ? <img src={image.imgPrevious} alt="" width="200px"/>  : null
          }<br/>


          <button className='anchor'>Update Location</button>

          {error && <div className='error'>{error}</div>}
        </form>
      </div>) 
       }     
    </>
  )
}

export default AddLocation;





