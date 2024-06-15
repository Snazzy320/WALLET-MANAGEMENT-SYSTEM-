
const mongoose = require("mongoose")



const transactionSchema = new mongoose.Schema({

    type: {
        type: String, required: true
    },
    
    amount: {
        type: Number, default: 0
    },
 
    user: {
        type: String, required: true
    },

    description: {
        type: String
    },

},{timestamps:true })


const transactionEntries = new mongoose.model("transaction Entries", transactionSchema)

module.exports = transactionEntries