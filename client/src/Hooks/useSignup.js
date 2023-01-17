import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
    const [error,setError]= useState(null);
    const {dispatch} = useAuthContext();

    //Post the data
    const signupdata= async(user) =>{
        setError(null);

        const response =  await fetch("http://localhost:4000/users/signup",{
            method: 'POST',
            headers: {'Content-type': 'application/json' },
            body: JSON.stringify(user)   
        });

        const data=  await response.json();
        //    console.log(data)
           
        if(!response.ok){
            setError(data.message) //message is comming from server(message:error.message)
            console.log(data.error)
        }
        if(response.ok){
            //save user data in local store
            // localStorage.setItem("user",JSON.stringify(data)) //in this user object, token is available

            // update user contexy
            // dispatch({type:"LOGIN", payload:data})
        }
    };
    
    return { signupdata, error }
};
