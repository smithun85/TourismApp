import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () =>{
    const [error,setError]=useState(null);
    const { dispatch }= useAuthContext();

    const loginData= async(email,password) =>{
        setError(null);

        const response = await fetch ("http://localhost:4000/users/login",{
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({email,password}) 
        });
        const data=  await response.json();

        if(!response.ok){
            setError(data.message)
        }
        if(response.ok){
            // local store
            localStorage.setItem("user",JSON.stringify(data))

            // update user context
            dispatch({type : "LOGIN", payload:data})
        }
    };
    return {loginData,error}
};
