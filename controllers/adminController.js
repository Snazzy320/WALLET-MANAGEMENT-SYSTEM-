const adminEntries = require("../model/adminModel")
const usersEntries = require("../model/usersModel")
const transactionEntries = require("../model/transactionModel")
const bcrypt = require("bcrypt")
const jsonwebtoken = require("jsonwebtoken")
const { sendWelcomeEmail,sendResetPasswordEmail  } = require("../utilities/utilities")



const registerAdmin =  async(req, res)=>{
   
    try {
    
        const { userName, email, password } = req.body

         const alreadyExistingUserName = await adminEntries.findOne({userName})

        if(alreadyExistingUserName){
            return res.status(400).json({message: "this username already exists!"})
        }

    
        if(!email){
            return res.status(400).json({message: "pls insert email"})
        }
    
        const alreadyExistingUser = await adminEntries.findOne({email})
    
    
        if(alreadyExistingUser){
            return res.status(400).json({message: "this user account already exists!"})
        }
    
    
        // Hash password with bcrypt
        const hashedPassword =await bcrypt.hash(password, 12)
    
        // Set new password to be hashed password & create user model object
        
    
        const newUser = new adminEntries({ userName, email, password: hashedPassword })
    
    
    // // Save user details
       await newUser.save()


    
    // send user an email
    // send Email

    const emailSubject = "Welcome to Our Admin Service"

    const respond = await sendWelcomeEmail(userName, email, emailSubject)
   



    
    
        return res.status(200).json({
            message: "successfull",
            user: { userName, email }
            
        })
        
    } catch (error) {

        return res.status(500).json({message: error.message})
        
    }

    }


    const adminLogin = async(req,res)=>{

        try {

            const { email, password } = req.body

            if(!email || !password ){
    
                return res.status(400).json({message: "please enter all field"})
            }
    
            const user = await adminEntries.findOne({email})
    
            if(!user){
                return res.status(400).json({message: "This user does not exist"})
            }

            const matchPassword = await bcrypt.compare(password, user.password)

            if(!matchPassword){
                return res.status(400).json({
                    message: "incorrect password or email"    
                })
            }

            if(user.active === false){
                return res.status(401).json({
                    message: "user not found!"    
                })

            }

            const userPayload = {

                id: user._id,
                email: user.email
               
            }

            const accessToken = await jsonwebtoken.sign(userPayload, process.env.ACCESS_TOKEN,
                {expiresIn: "30m"})

                console.log({accessToken})

                return res.status(200).json({
                    message: "successful",
                    accessToken,
                    user

                })

            
    
            
        } catch (error) {

            return res.status(500).json({message: error.message})
            
        }

    }

    const  handleAllUsersDetails = async(req, res)=>{

        try {
    
            const users = await usersEntries.find()
    
            return res.status(200).json({
                message: "successful",
                count: users.length,
                users
            })
            
        } catch (error) {
    
            return res.status(500).json({message: error.message})
            
        }
       
    
    }

    const handleGetOneUser = async(req, res)=>{

        try {

            
            const { id } = req.params

            const oneUser =await usersEntries.findById(id )

            return res.status(200).json({
                message: "successful",
                oneUser
            })


        

        } catch (error) {

            return res.status(500).json({message: error.message})
            
        }
            

    }

    
    const  userTransactionHistory = async(req, res)=>{
    try {
        
        const {id} = req.params

        try{
            var user = await usersEntries.findById(id )
        } catch (error) {
            return res.status(404).json({message: "user doesnt exists"})
        }

        const balance = user.wallet_balance

        const history = await transactionEntries.find({"user": id}).sort({createdAt: -1})

        return res.status(200).json({
            message: "successful",
            count: history.length,
            balance,
            history,
        })
        
    } catch (error) {

        return res.status(500).json({message: error.message})
        
    }

}


    

    const handleDeleteUserAccount = async(req,res)=>{

        try {

            const { id } = req.params


            const deleteAccount = await usersEntries.findByIdAndDelete(id)

            return res.status(200).json({
                message: "deleted successfully",
               


            })
            
        } catch (error) {

            return res.status(500).json({message: error.message})
            
        }

       

    }

    const disableUserWalletAccount = async(req, res)=>{

        try {

            const { id } = req.params

            const user = await usersEntries.findById(id)
    
            if(!user) {
                return res.status(404).json({message: "user not found"})
    
            }
    
            user.active = false
    
            await user.save()

            return res.status(401).json({message: "Account disabled"})
    
            
        } catch (error) {

            return res.status(500).json({message: error.message})
            
        }

    }

    const ForgotAdminPassword = async(req, res)=>{

        try {

        const { email } = req.body

        const user = await adminEntries.findOne({email})

        if(!user) {
            return res.status(404).json({message: "user not found"})

        }

        const userPayload = {

            id: user._id,
            email: user.email,
  
        }

          // Generate AccessToken

        const accessToken = await jsonwebtoken.sign(userPayload, process.env.ACCESS_TOKEN,
            {expiresIn: "30m"})

        const Url= `www.wallet.com/${accessToken}` 
        
        // Send Email

         const emailSubject = "Reset Admin Password"

        const response = await sendResetPasswordEmail ( email, emailSubject, Url )
        


        return res.status(200).json({
            message: "check email to reset password"
        })

            
        } catch (error) {
            return res.status(500).json({message: error.message})
            
        }    

    }

    const resetAdminPassword = async(req,res)=>{

        try {   

            const { email, password} = req.body

            const user = await adminEntries.findOne({email})

            if(!user) {

                 return res.status(404).json({message: "user not found"})
            }

            const hashedPassword = await bcrypt.hash(password, 12)

            user.password = hashedPassword

            await user.save()

            return res.status(200).json({message: "successful", hashedPassword})
            
        } catch (error) {

            return res.status(500).json({message: error.message})
            
        } 

    }

   


    module.exports = {
        registerAdmin,
        adminLogin,
        handleAllUsersDetails,
        handleGetOneUser,
        userTransactionHistory,
        handleDeleteUserAccount,
        disableUserWalletAccount,
        ForgotAdminPassword,
        resetAdminPassword

    }
