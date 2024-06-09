
const mongoose = require("mongoose")



const transactionSchema = new mongoose.Schema({

    type: {
        type: String, required: true
    },
    
    amount: {
        type: String, default: 0
    },
 
    user: {
        type: String, required: true
    },

    date: {
        type: String, required: true
    },

    description: {
        type: String
    },

    wallet_balance: {
        type: String, default: 0
    },

    active: {type: Boolean, default:true},

},{timestamps:true })


// const transactionEntries = new mongoose.model("transactionEntries", userSchema)

// module.exports = transactionEntries