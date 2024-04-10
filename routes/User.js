import express from "express";
import User from "../models/User.js";
import custumResponse from "../utilities/response.js";
import bcrypt from "bcrypt"

const authRouter=express.Router();



authRouter.post("/signup" ,async(req,res)=>{
    const{name,email,password,phone}=req.body

    if(!name||!email||!password||!phone){
        return custumResponse(res,400,false,"please fill all the details")
    }

    try{
        const foundUser=await User.findOne({email:email})
        if(foundUser==null){
            console.log("1", foundUser)
            //hash the password 
            const hashedPassword = await bcrypt.hash(password,10)//it encrypt 10 times
            console.log("1a", hashedPassword)

            const newUser=new User({
                name,email,password:hashedPassword,phone
            })
            console.log("2", newUser)
            const nUser=await newUser.save()
            console.log("3", nUser)
            if(nUser){
                return custumResponse(res,200,true,"User registered successfully",nUser)
            }
        }

        else{
            return custumResponse(res,400,false,"User already exists",null)
        }
    }

    catch(err){
        custumResponse(res,500,false,"something went wrong",null)
    }

})

export default authRouter


