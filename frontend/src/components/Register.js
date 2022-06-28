import "./Register.css"

import RoomIcon from '@mui/icons-material/Room';
import CancelIcon from '@mui/icons-material/Cancel';

import { useState,useRef } from "react";
import {axiosInstance} from "../config";

export default function Register({setShowRegister}){
    const[success,setSuccess]=useState(false);
    const[error,setError]=useState(false);
    const nameRef=useRef();
    const emailRef=useRef();
    const passwordRef=useRef();


    const handleSubmit =async(e) =>{
        e.preventDefault();
        const newUser={
            username:nameRef.current.value,
            email:emailRef.current.value,
            password:passwordRef.current.value,
        };
        try{

            await axiosInstance.post("/users/register",newUser);
            setError(false);
            setSuccess(true);
            
        }catch(err){

            setError(true);

        }
        };
    return(
        <div className="registerContainer">
            <div className="logo">
                <RoomIcon/>
                Pin it here!
            </div>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="username" ref={nameRef}></input>
                    <input type="email" placeholder="email" ref={emailRef}></input>
                    <input type="password" placeholder="password" ref={passwordRef}></input>
                    <button className="registerbtn">Register</button>
                    {success &&
                    <span className="success"> Login Sucessful!</span>}
                    {error &&
                    <span className="error"> Login failed!</span>}
                </form>
                <CancelIcon className="registerCancel" onClick={()=>setShowRegister(false)}/>
       </div>
    )
}