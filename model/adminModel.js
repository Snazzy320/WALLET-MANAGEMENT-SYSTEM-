
const mongoose = require("mongoose")



const adminSchema = new mongoose.Schema({

    userName: {
        type: String, required: true
    },
    
    email: {
        type: String, required: true
    },
 
    password: {
        type: String, required: true
    },

  
   
    active: {type: Boolean, default:true},

    role: {
        type: String, required: true, enum: ['user', 'admin'], default: 'admin' 
    }

},{timestamps:true })


const adminEntries = new mongoose.model("admin Entries", adminSchema)

module.exports = adminEntries