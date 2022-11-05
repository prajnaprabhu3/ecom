require('dotenv').config();
const express=require("express");
const cloudinary = require("cloudinary");

// datbase connect import 
const connectDatabase=require("./database");

// Handling Uncaught Exception 
process.on("uncaughtException",(err)=>{
    console.log(`Error:${err.message}`);
    console.log("Shutting down the server due to Uncaught Exception");

    process.exit(1);
});

const app=require("./app");

// connecting to database 
connectDatabase()


// cloudinary connect 
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });


// listen to a certain port number / listen for request on a certain port
const server = app.listen(process.env.PORT, () => {
    console.log(`Server running on port: http://localhost:${process.env.PORT}`);
})

// console.log(prajna)

// Unhandled Promise Rejection 
process.on("unhandledRejection",err=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to unhandled Promise Rejection`);

    server.close(()=>{
        process.exit(1);
    });
});