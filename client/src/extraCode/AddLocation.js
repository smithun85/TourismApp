import './AddLocationStyle.css';
import React, { useContext, useState, createRef } from 'react'
import axios from 'axios';
import { Data } from '../../Context/TourContext';
import Navbar from '../../Components/Navbar/Navbar';
import { useNavigate,Link } from 'react-router-dom'

const AddLocation = () => {

  const {
    form, setForm,
    error, setError,
    updateForm, setUpdateForm
  } = useContext(Data)
  console.log(updateForm._id)

  const navigate = useNavigate()

  //taking user data from token
  const userToken = JSON.parse(localStorage.getItem("user"));  //setItem() from useSingup.js
  const { token } = userToken
  const config = {
    headers: {
      Authorization: ` Bearer ${token}`
    }
  }

  //Image Upload from input field
  const [file, setFile] = useState([]);
  //updated Image
  const [updateFile,setUpdateFile] = useState([])

  const updateFormField = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }


  // CREATE form function: Post the data
  const createTour = async (e) => {
    e.preventDefault();

    const formData = new FormData()
    // const file = e.target.files[0]
    formData.append("file", file);
    console.log(file)
    formData.append("upload_preset", "imageUrl")
    // const responseData = await axios.post("https://api.cloudinary.com/v1_1/dmvanhixj/image/upload", formData)
    // const data = [responseData.data.secure_url]
    // // console.log(data);

    setForm({ ...form.imageUrl = file })
    // console.log(form)


    const response = await axios.post('http://localhost:4000/tours', form, config)
    navigate("/locations")
    console.log(response)
    // console.log(form) 

    setForm({
      title: "",
      location: "",
      price: "",
      description: "",
      imageUrl: []
    })
    setError(null)
  }


  //Update the Data
  const handleUpdateFieldChange = (e) => {
    const { name, value } = e.target
    setUpdateForm({ ...updateForm, [name]: value })
  }

 
  console.log(updateForm)

  const updateTour = async (event) => {
    event.preventDefault();

    //destructure the data
    // const { _id, title, location, price, description, imageUrl } = updateForm;
    const formData = new FormData();
    formData.append("updateFile", updateFile);
    // formData.append("upload_preset", "imageUrl")
    // const responseData = await axios.post("https://api.cloudinary.com/v1_1/dmvanhixj/image/upload", formData)
    // const data = [responseData.data.secure_url]
    // setUpdateForm({...updateForm.imageUrl = data})
    // console.log(updateForm)

    //Updated data send into DB
    await axios.patch(`http://localhost:4000/Tours/${updateForm._id}`,
    updateForm,
      config
      );

    //clear the field after updating the value
    setUpdateForm({
      _id: null,
      title: "",
      location: "",
      price: "",
      description: "",
      imageUrl: []
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
            <input multiple type="file" name='image' value={form.image} onChange={(e) => { setFile(e.target.files[0]) }} />
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
            <input multiple type="file" name='image' value={updateForm.image} onChange={(e) => { setUpdateFile(e.target.files[0]) }} />
          </div>


          <button className='anchor'>Update Location</button>

          {error && <div className='error'>{error}</div>}
        </form>
      </div>) 
       }     
      
     


    </>
  )
}

export default AddLocation;





