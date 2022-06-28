const express = require('express');
const mongoose = require('mongoose');
const app =express();
const pinRoute=require("./routes/pins");
const userRoute=require("./routes/users");
const dotenv = require('dotenv');
const path =require('path');
dotenv.config();

app.use(express.json());

mongoose
.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
    console.log("Mongoose connected");
})
.catch((err)=>console.log(err));

app.use("/api/pins",pinRoute); 
app.use("/api/users",userRoute); 

app.use(express.static(path.join(__dirname, "/frontend/build")));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/frontendnpm/build', 'index.html'));
});

app.listen(process.env.PORT || 8800,()=>{
    console.log("We are running");
})

