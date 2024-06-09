
const mongoose = require("mongoose")



const userSchema = new mongoose.Schema({

    fullName: {
        type: String, required: true
    },
    
    username: {
        type: String, required: true
    },
 
    email: {
        type: String, required: true
    },

    password: {
        type: String, required: true
    },

    phoneNumber: {
        type: String
    },

    wallet_balance: {
        type: String, default: 0
    },

    active: {type: Boolean, default:true},

},{timestamps:true })


const usersEntries = new mongoose.model("usersEntries", userSchema)

module.exports = usersEntries