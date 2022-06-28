import "./login.css"

import RoomIcon from '@mui/icons-material/Room';
import CancelIcon from '@mui/icons-material/Cancel';
import { useState,useRef } from "react";
import {axiosInstance} from "../config";

export default function Register({setShowLogin,myStorage,setCurrentUser}){
    
    const[error,setError]=useState(false);
    const nameRef=useRef();
    
    const passwordRef=useRef();


    const handleSubmit =async(e) =>{
        e.preventDefault();
        const user={
            username:nameRef.current.value,
            password:passwordRef.current.value,
        };
        try{
            const res =await axiosInstance.post("/users/login",user);
            myStorage.setItem("user",res.data.username)
            setCurrentUser(res.data.username)
            setShowLogin(false);
            setError(false);
           
            
        }catch(err){

            setError(true);

        }
        };
    return(
        <div className="loginContainer">
            <div className="logo">
                <RoomIcon/>
                Pin it here!
            </div>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="username" ref={nameRef}></input>
                    
                    <input type="password" placeholder="password" ref={passwordRef}></input>
                    <button className="loginbtn">Login</button>
                    
                    {error &&
                    <span className="error"> Login failed!</span>}
                </form>
                <CancelIcon className="loginCancel" onClick={()=>setShowLogin(false)}/>
       </div>
    )
}