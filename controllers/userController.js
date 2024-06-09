const usersEntries = require("../model/usersModel")
const bcrypt = require("bcrypt")


const  handleAllUsersRegistration = async(req, res)=>{
    const users = await usersEntries.find()

    return res.status(200).json({
        message: "successful",
        count: usersEntries.length,
        users
    })

}

const handleNewUserRegisteration = async(req, res)=>{
   


    // Getting User Details
        // Destruring
    
        const { fullName, username, email, password, phoneNumber } = req.body
    
    // Validating to make sure there is an email
        if(!email){
            return res.status(400).json({message: "pls insert email"})
        }
    
        // checking if email is already registered
        const alreadyExistingUser = await usersEntries.findOne({email})
    
    
    // Return if user already exist
        if(alreadyExistingUser){
            return res.status(400).json({message: "this user account already exists!"})
        }
    
        // Hash password with bcrypt
        const hashedPassword =await bcrypt.hash(password, 12)
    
        // Set new password to be hashed password & create user model object
        
    
    
    
        const newUser = new usersEntries({ fullName, username, email, password: hashedPassword, phoneNumber })
    
    
    // Save user details
       await newUser.save()


    
    // send user an email
    // send Email

    
    
        return res.status(200).json({
            message: "successfull",
            user: {fullName, username, email, phoneNumber }
            
    
        })
    }

module.exports = {
    handleNewUserRegisteration,
    handleAllUsersRegistration
}
