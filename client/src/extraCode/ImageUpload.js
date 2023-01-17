// const { useState, createRef } = require("react")

// const AvatarUpload = () =>{
 
//     const [fileImage, setFileImage] = useState();
//      const inputFileRef = createRef();

//         //URL.revokeObjectURL() method releases an existing object URL which was created by using URL.createObjectURL(),
//      const cleanup = ()=>{
//         URL.revokeObjectURL(fileImage);
//         inputFileRef.current.value = null;
//      };

//      const setImages = (newImage) =>{
//         if(image) {
//             cleanup();
//         }
//         setFileImageImage(newImage)
//      };

//      //URL.createObjectURL() static method creates a string containing a URL representing the object given in the parameter.
      
//         if(newImage) {
//             setImages(URL.createObjectURL(newImage))  
//         }
//         props.imageUpload(event)
//      }



// const createTour= async(e) =>{
//     e.preventDefault();

//     const formData = new FormData()

//     formData.append("image", fileData)
// }





// const [imageUrl, setImageUrl] = useState('')

//   const convertBase64 = (file) => {
//     const reader = new FileReader();
//     if (file) {
//       reader.readAsDataURL(file)   //convert image in string
//       reader.onloadend = () => {
//         setImageUrl(reader.result)
//       }
//     } else {
//       setImageUrl('')
//     }
//   }

//    const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     convertBase64(file);
//   }




 //Image Upload
//  const [file , setFile] = useState()
//  const [imageUrl, setImageUrl] = useState('');

//  const [uploadedData, setUploadedData] = useState("")

//  const convertBase64 = (file) => {
//    const reader = new FileReader();
//    if (file) {
//      reader.readAsDataURL(file)   //convert image in string

//      reader.onloadend = () => {   //wait untill image upload  
//        setImageUrl(reader.result)
//      }

//    } else {
//      setImageUrl('')
//    }
//  }
//  const { user } = useAuthContext();

//  const {
//    form, setForm,
//    error, setError
//  } = useContext(Data)
//  const updateFormField = (e) => {
//    const { name, value } = e.target
//    setForm({ ...form, [name]: value, 'imageUrl':imageUrl }) 
//  } 

//  const handleFileChange = (e) => {
//    const file = e.target.files[0];
//    setFile(file)
//    convertBase64(file);
//  }

// CREATE form function: Post the data
//  const createTour = async (e) => {
//    e.preventDefault();
    
   // const response = await axios.post('http://localhost:4000/tours',form
   // )
   


   // console.log(response)
   // console.log(imageUrl) 
   // console.log(form)

   // setForm({
   //   title: "",
   //   location: "",
   //   price: "",
   //   description: "",
   //   // imageUrl:""
   // })
   // setError(null)
//  }

