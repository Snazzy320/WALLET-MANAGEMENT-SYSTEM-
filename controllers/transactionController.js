const usersEntries = require("../model/usersModel")
const transactionEntries = require("../model/transactionModel")


const  handleCredit = async(req, res)=>{
    try {
        const {id, amount, description} = req.body

        try{
            var user = await usersEntries.findById(id )
        } catch (error) {
            return res.status(404).json({message: "user doesnt exists"})
        }

        const newTransaction = new transactionEntries({type: 'credit', amount, description, user: id})

        const wallet_balance = Number(user.wallet_balance) + Number(amount)
        await newTransaction.save()

        updatedUser = await usersEntries.findByIdAndUpdate(
            id,
            {wallet_balance},
            {new: true}
        ) 

        return res.status(200).json({
            message: "successful",
            user: updatedUser,
            newTransaction,
        })
        
    } catch (error) {

        return res.status(500).json({message: error.message})
        
    }
   

}
const  handleDebit = async(req, res)=>{
    try {
        const {id, amount, description} = req.body

        try{
            var user = await usersEntries.findById(id )
        } catch (error) {
            return res.status(404).json({message: "user doesnt exists"})
            }
            
        if (user.wallet_balance < amount) {
                return res.status(400).json({message: "Insufficient Balance"})
        }

        const newTransaction = new transactionEntries({type: 'debit', amount, description, user: id})

        const wallet_balance = Number(user.wallet_balance) - Number(amount)
        await newTransaction.save()

        updatedUser = await usersEntries.findByIdAndUpdate(
            id,
            {wallet_balance},
            {new: true}
        ) 

        return res.status(200).json({
            message: "successful",
            user: updatedUser,
            newTransaction,
        })
        
    } catch (error) {

        return res.status(500).json({message: error.message})
        
    }
   

}

const  handleHistory = async(req, res)=>{
    try {
        const {id} = req.body

        try{
            var user = await usersEntries.findById(id )
        } catch (error) {
            return res.status(404).json({message: "user doesnt exists"})
        }

        const history = await transactionEntries.find({"user": id}).sort({createdAt: -1})

        return res.status(200).json({
            message: "successful",
            count: history.length,
            history,
        })
        
    } catch (error) {

        return res.status(500).json({message: error.message})
        
    }
   

}

module.exports = {
    handleCredit,
    handleHistory,
    handleDebit
}