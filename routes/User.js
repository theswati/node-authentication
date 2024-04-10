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


authRouter.post("/login", async (req,res)=>{
    const {email,password}=req.body

    if(!email||!password){
        return custumResponse(res,400,false,"Please fill all the fields,null")
    }

    try{
        const foundUser=await User.findOne({email:email})
        if (foundUser==null){
            return custumResponse(res,400,false,"User doesnot exist",null)
        }
         console.log("1", foundUser)
        //check hashed password

        const isMatch=await bcrypt.compare(password,foundUser.password)
        console.log("2", isMatch, typeof isMatch)
        if(isMatch==true){
            console.log("3", "line 66")
            return custumResponse(res,200,true,"User logged in successfully", foundUser)
        }

        else{
            return custumResponse(res,400,false,"Invalid credentials",null)
        }
    }
    catch(err){
        custumResponse(res,500,false,"something went wrong",null)
    }
})

export default authRouter


