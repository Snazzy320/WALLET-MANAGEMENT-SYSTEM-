
const mongoose = require("mongoose")
const dotenv =require("dotenv").config()



// function to connect to Database
const connectDatabase = async()=>{

    try {

      await  mongoose.connect(process.env.MONGODB_URL)

       .then(()=> console.log("mongodb is connected"))
        
    } catch (error) {
        console.log("error connecting to db");
        
    }
}

module.exports = connectDatabase
