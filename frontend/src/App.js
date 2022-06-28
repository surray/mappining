import React,{useEffect,useState} from 'react';
import Map, {Marker,Popup} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import RoomIcon from '@mui/icons-material/Room';
import StarIcon from '@mui/icons-material/Star';
import "./App.css";
import {axiosInstance} from './config';
import {format} from 'timeago.js';
import Register from './components/Register';
import Login from './components/login';


function App() {
const myStorage=window.localStorage;
const [currentUser,setCurrentUser]=useState(myStorage.getItem("user"));
const [pins,setPins]=useState([]);
const [currentPlaceId,setCurrentPlaceId]=useState(null);
const [newPoint,setNewPoint]=useState('');
const [title,setTitle]=useState(null);
const [desc,setDesc]=useState(null);
const [rating,setRating]=useState(0);
const [showRegister,setShowRegister]=useState(false);
const [showLogin,setShowLogin]=useState(false);


useEffect(()=>{
 const getPins =async ()=>{
   try{
     const res =await axiosInstance.get("/pins");
     
     setPins(res.data);
     } catch(err){
      console.log(err);
     }
  };
 getPins()
},[]);

//showing popup
const handleMarkerClick =(id)=>{

  setCurrentPlaceId(id);
  
}
//adding new place
const handleAddClick = (e)=>{
  const [longitude,latitude] =e.lngLat.toArray();
  setNewPoint({
    lat:latitude,
    long:longitude,});
  };  
  
  const handleSubmit=async(e)=>{
    e.preventDefault();
    const newPin={
      username:currentUser,
      title,
      desc,
      rating,
      lat:newPoint.lat,
      long:newPoint.long,
    }
    try{
      const res =await axiosInstance.post("/pins",newPin);
      setPins([...pins,res.data]);
      setNewPoint(null);
    }catch(err){
      console.log(err)
    }
  };
  
  const handleLogout = ()=>{
    myStorage.removeItem("user");
    setCurrentUser(null);
  }

  return (
    
    <div className="App">
     <Map  initialViewState={{
         latitude: 13.0827,
         longitude: 80.2707,
         zoom: 12
     }}
     style={{width: '100vw', height: '100vh'}}
     mapboxAccessToken="pk.eyJ1Ijoic3VyYXkyOCIsImEiOiJjbDRzcGNuMmMwZTVmM2ttbDdiOXIyZnB2In0.79tLyO9iU4BWg6Yfja_1Wg"
     mapStyle="mapbox://styles/mapbox/streets-v9"
     onDblClick={handleAddClick}
     >
      
       {
        
        pins.map((p)=> {
         return(<>
            <Marker latitude={p.lat} longitude={p.long} color="red">
              <RoomIcon 
              size='12px'
              style={{color:p.username===currentUser ?'tomato':'slateblue'}}
              onClick={() =>handleMarkerClick(p._id)}
              cursor='pointer'
              >
              </RoomIcon>
            </Marker>
            {p._id===currentPlaceId &&
              <Popup 
                longitude={p.long} 
                latitude={p.lat}
                closeButton={true}
                closeOnClick={false}
                anchor="left"
                key={p._id}
                onClose={()=>setCurrentPlaceId(null)}
              >
                <div className="card">
                  <label>Place</label>
                  <h4 className='place'>{p.title}</h4>
                  <label>Review</label>
                  <p className='desc'>{p.desc}</p>
                  <label>Rating</label>
                    <div className='Stars'>
                      {Array(p.rating).fill(<StarIcon className='star'/>)}
                      
                    </div>
                  <label>Information</label>
                  <span className='username'> Created by <b>{p.username}</b></span>
                  <span className='date'>{format(p.createdAt)}</span>
                </div>
              </Popup> 
            }
          </>);
          }
          )
        }

      {newPoint &&  (
        <>
        
         <Popup 
          latitude={newPoint.lat}
          longitude={newPoint.long} 
          closeButton={true}
          closeOnClick={false}
          anchor="left"
          onClose={()=>setNewPoint(null)}
          cursor='pointer'
         >
         <div>
           <form onSubmit={handleSubmit}>
             <label>Title</label>
             <input placeholder='Enter the title' onChange={(e)=>setTitle(e.target.value)}/>
             <label>Review</label>
             <textarea placeholder='say something about this place.'onChange={(e)=>setDesc(e.target.value)} />
             <label>Rating</label>
             <select onChange={(e)=>setRating(e.target.value)}>
               <option key="uniqueId1" value="1">1</option>
               <option value="2">2</option>
               <option value="3">3</option>
               <option value="4">4</option>
               <option value="5">5</option>
             </select>
             <button className='submitButton' type='submit'>Add Pin</button>
           </form>
         </div>
         </Popup>
        </>
      )} 
      {currentUser ?(<button className='button logout' onClick={handleLogout}>Log Out</button>):( <div className='buttons'>
        <button className='button login' onClick={()=>setShowLogin(true)}>Login</button>
        <button className='button register' onClick={()=>setShowRegister(true)}>Register</button>
      </div>)}
      {showRegister && <Register setShowRegister={setShowRegister}/>}
      {showLogin && <Login setShowLogin={setShowLogin} myStorage={myStorage} setCurrentUser={setCurrentUser}/>}
     
    </Map>
  </div>
  );
}

export default App;
