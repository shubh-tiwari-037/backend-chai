// require('dotenv').config({path:.'/env'})
import dotenv from "dotenv"
import connectDB from "./db/index.js"
import { app } from "./app.js"

dotenv.config({
    path: './env'
})


connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000, ()=>{
        console.log(`server is listining on port ${process.env.PORT}`);
    })
})
.catch((error)=>{
console.log("DB CONNECTION FAILED !!!", error)
})










/*
import express from "express";
const app= express()

(async ()=>{
    try{
        await mongoose.connect(`${process.env.MONGODB_URL}/ ${DB_NAME}`)
        app.on("error",(error)=>{
            console.log("error",error);
            throw error
        })

        app.listen(process.env.PORT,()=>{
            console.log(`app is listinh on port ${process.env.PORT}`);
        })
    } catch (error){
        console.error("ERROR",error)
        throw error
    }
})()
    */