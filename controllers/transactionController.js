const usersEntries = require("../model/usersModel")
const transactionEntries = require("../model/transactionModel")


const handleCredit = async(req,res)=>{
    try {

        const user = req.user

        const { amount, description } = req.body

      
        if(!amount ) {
            return res.status(400).json({message: "please put amount"})
        }

        const newTransaction = new transactionEntries({type: "credit", amount, description, user: user.id })
        
        const wallet_balance = Number(user.wallet_balance) + Number(amount)
        
        await newTransaction.save()

        const updatedUser =await usersEntries.findByIdAndUpdate(
           user.id,
            {wallet_balance},
            {new:true}
        )

        return res.status(200).json({
            message: "successful",
            user:updatedUser,
            newTransaction
            
        })

    } catch (error) {

        return res.status(500).json({message: error.message})
 
    }

}

const handleDebit = async(req,res)=>{
    try {

        const user = req.user

        const { amount, description } = req.body


        if(!amount ) {
            return res.status(400).json({message: "please put amount"})
        }
        

        if(user.wallet_balance < amount ) {
            return res.status(400).json({message: "Insufficient Balance"})
        }
        

        const newTransaction = new transactionEntries({type: "debit", amount, description, user: user.id})
        
        const wallet_balance = Number(user.wallet_balance) - Number(amount)
        await newTransaction.save()

        const updatedUser = await usersEntries.findByIdAndUpdate(
            user.id,
            {wallet_balance},
            {new:true}
        )

        return res.status(200).json({
            message: "successful",
            user: updatedUser,
            newTransaction
        })
        
    } catch (error) {

        return res.status(500).json({message: error.message}) 
        
    }

}

const handleHistory = async(req,res)=>{
    try {

        const user = req.user

        const history = await transactionEntries.find({user: user.id}).sort({createdAt: -1})
        
        return res.status(200).json({
            message: "successful",
            count: history.length,
            history
        
            
        })
    } catch (error) {

        return res.status(500).json({message: error.message})
        
    }
}


module.exports = {
    handleCredit,
    handleDebit,
    handleHistory
}