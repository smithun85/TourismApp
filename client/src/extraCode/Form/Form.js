import React, { useContext } from 'react'
import axios from 'axios'
import "./formStyle.css"
import { Data } from '../../Context/TourContext'
import { useAuthContext } from '../../Hooks/useAuthContext';

const Form = () => {

    const { user } = useAuthContext();

    const {
        form, setForm,
        getTours,
        tours, setTours,
        updateForm, setUpdateForm,
        error, setError
    } = useContext(Data)

    // CREATE form function: Post the data
    const updateFormField = (e) => {
        const { name, value } = e.target

        setForm({ ...form, [name]: value })
    }

    const createTour = async (e) => {
        e.preventDefault();
        const response = await axios.post('http://localhost:4000/Tours', form,
            {
                headers: {
                    Authorization: ` Bearer ${user.token}`
                }
            })
            const jsonData=  await response.json();

        if (!response.ok) {
            setError(jsonData.error)
            console.log(jsonData.error)
        }

        if (response.ok) {
            setTours([...tours, response.jsonData])
            setForm({
                title: "",
                location: "",
                price: "",
                description: "",
                imageUrl: ""
            })
            setError(null)
            console.log('New Tour added', jsonData)
        }
        getTours();
    }

    //Update the Data
    const handleUpdateFieldChange = (e) => {
        const { name, value } = e.target
        setUpdateForm({ ...updateForm, [name]: value })
    }

    const updateTour = async (event) => {
        event.preventDefault();

        //destructure the data
        const { _id, title, location, price, description, imageUrl } = updateForm;

        //Updated data send into DB
        await axios.patch(`http://localhost:4000/Tours/${_id}`,
            { title, location, price, description, imageUrl },
            {
                headers: {
                    "Authorization": ` Bearer ${user.token}`
                }
            });

        //view that data on UI
        getTours();

        //clear the field after updating the value
        setUpdateForm({
            _id: null,
            title: "",
            location: "",
            price: "",
            description: "",
            imageUrl: ""
        })
    }

    return (
        <>
            {/*Create form to Post the form data */}
           <form action="" className="form_Field" onSubmit={createTour}>
                <h2>Add a new Location</h2>

                <div className="field">
                    <label> title: </label>
                    <input type="text" name='title' value={form.title} onChange={updateFormField} />
                </div>

                <div className="field">
                    <label> Location: </label>
                    <input type="text" name='location' value={form.location} onChange={updateFormField} />
                </div>


                <div className="field">
                    <label>Price: </label>
                    <input type="text" name='price' value={form.price} onChange={updateFormField} />
                </div>

                <div className="field">
                    <label>Description: </label>
                    <input type="text" name='description' value={form.description} onChange={updateFormField} />
                </div>

                <div className="field">
                    <label>Image: </label>
                    <input type="file" name='image' value={form.image} onChange={updateFormField} />
                </div>

                {error && <div className='error'>{error}</div>}
                <button>Add Tour</button>

            </form>


            Update form to update the form Data
            {updateForm._id && (<form className="form" onSubmit={updateTour}>
                <h2>Edit the Tour</h2>

                <div className="field">
                    <label>title: </label>
                    <input type="text" name='title' value={updateForm.title} onChange={handleUpdateFieldChange} />
                </div>

                <div className="field">
                    <label> Location: </label>
                    <input type="text" name='location' value={updateForm.location} onChange={handleUpdateFieldChange} />
                </div>


                <div className="field">
                    <label>Price: </label>
                    <input type="text" name='price' value={updateForm.price} onChange={handleUpdateFieldChange} />
                </div>

                <div className="field">
                    <label>Description: </label>
                    <input type="text" name='description' value={form.description} onChange={handleUpdateFieldChange} />
                </div>

                <div className="field">
                    <label>Image: </label>
                    <input type="file" name='image' value={form.image} onChange={handleUpdateFieldChange} />
                </div>


                <button>Update</button>

                {error && <div className='error'>{error}</div>}

            </form>)
            }



        </>
    )

}

export default Form