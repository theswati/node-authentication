import mongoose from "mongoose";


// swathi

// w3xoj8CSRGsNTfT1
// online url
// mongodb+srv://swathi:w3xoj8CSRGsNTfT1@auth.de2c7ol.mongodb.net/

mongoose.connect("mongodb+srv://swathi:w3xoj8CSRGsNTfT1@auth.de2c7ol.mongodb.net/")
.then(()=>console.log("MongoDB connected"))
.catch(err=>console.log("MongoDB connection error",err))

// if using local url

// mongoose.connect("mongodb://localhost:27017/auth")
// .then(()=>console.log("MongoDB connected"))
// .catch(err=>console.log("MongoDB connection error",err))