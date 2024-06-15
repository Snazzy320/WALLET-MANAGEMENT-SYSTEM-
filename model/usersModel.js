
const mongoose = require("mongoose")



const userSchema = new mongoose.Schema({

    fullName: {
        type: String, required: true
    },
    
    userName: {
        type: String, required: true
    },
 
    email: {
        type: String, required: true
    },

    password: {
        type: String , required: true
    },

    phoneNumber: {
        type: String, required: true
    },

    wallet_balance: {
        type: String, default: 0
    },

    active: {type: Boolean, default:true},

},{timestamps:true })


const usersEntries = new mongoose.model("user's Entries", userSchema)

module.exports = usersEntries