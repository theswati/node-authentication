// const express=require ("express");

import express from "express";
import "./database.js"
import User from "./models/User.js";

import authRouter from "./routes/User.js";

const app=express();
const port=5000;


//sample apis
// app.get('/',(req,res)=>{
//     res.send("Hello World 1")
// });

// app.post('/hi',(req,res)=>{
//     res.send("Hello World 2")
// });


app.use(express.json()) // to process json data

app.use(authRouter)


app.listen(port,()=>console.log(`server running on port :http://localhost:${port}`));

