const usersEntries = require("../model/usersModel")
const bcrypt = require("bcrypt")
const jsonwebtoken = require("jsonwebtoken")
const { sendWelcomeEmail,sendResetPasswordEmail  } = require("../utilities/utilities")


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

const handleNewUserRegisteration = async(req, res)=>{
   
    try {
    
        const { fullName, userName, email, password, phoneNumber } = req.body

         const alreadyExistingUserName = await usersEntries.findOne({userName})

        if(alreadyExistingUserName){
            return res.status(400).json({message: "this username already exists!"})
        }

    
        if(!email){
            return res.status(400).json({message: "pls insert email"})
        }
    
        const alreadyExistingUser = await usersEntries.findOne({email})
    
    
        if(alreadyExistingUser){
            return res.status(400).json({message: "this user account already exists!"})
        }

        const alreadyExistingPhoneNumber = await usersEntries.findOne({phoneNumber})

        if(alreadyExistingPhoneNumber){
            return res.status(400).json({message: "this phoneNumber already exists!"})
        }

    
    
        // Hash password with bcrypt
        const hashedPassword =await bcrypt.hash(password, 12)
    
        // Set new password to be hashed password & create user model object
        
    
        const newUser = new usersEntries({ fullName, userName, email, password: hashedPassword, phoneNumber })
    
    
    // // Save user details
       await newUser.save()


    
    // send user an email
    // send Email

    const emailSubject = "Welcome to Our Service"

    const respond = await sendWelcomeEmail(fullName, email, emailSubject)
   



    
    
        return res.status(200).json({
            message: "successfull",
            user: {fullName, userName, email, phoneNumber }
            
        })
        
    } catch (error) {

        return res.status(500).json({message: error.message})
        
    }

    }

    const handleUsersLogin = async(req,res)=>{

        try {

            const { email, password } = req.body

            if(!email || !password ){
    
                return res.status(400).json({message: "please enter all field"})
            }
    
            const user = await usersEntries.findOne({email})
    
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

    const userPasswordUpdate = async(req,res)=>{

    try {

        const user = req.user
        const { oldPassword, newPassword } = req.body;

      // Find the user by id from the accessToken
      const users = await usersEntries.findOne({ user: user.id});
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Compare the old password with the stored hashed password
      const isMatch = await bcrypt.compare(oldPassword, user.password);
  
      if (!isMatch) {
        return res.status(400).json({ message: 'Old password is incorrect' });
      }
  
      // Hash the new password
      const hashedNewPassword = await bcrypt.hash(newPassword, 12);
  
      // Update the user's password in the database
      user.password = hashedNewPassword;
      await user.save();
  
      res.status(200).json({
         message: 'Password updated successfully',
         user: hashedNewPassword
          
        });

    } catch (error) {
      res.status(500).json({ message: error.message });
    }

}

    const handleFullUpdate = async(req, res)=>{

        try {

        const user = req.user

        // const { id } = req.params

        const { fullName, userName, email, oldPassword, newPassword, phoneNumber } = req.body

        const alreadyExistingUserName = await usersEntries.findOne({userName})

        if(alreadyExistingUserName){
            return res.status(400).json({message: "this username already exists!"})
        }

        
        const alreadyExistingUser = await usersEntries.findOne({email})
    
        if(alreadyExistingUser){
            return res.status(400).json({message: "this user account already exists!"})
        }

        const alreadyExistingPhoneNumber = await usersEntries.findOne({phoneNumber})

        if(alreadyExistingPhoneNumber){
            return res.status(400).json({message: "this phoneNumber already exists!"})
        }


          // Compare the old password with the stored hashed password
      const isMatch = await bcrypt.compare(oldPassword, user.password);
  
      if (!isMatch) {
        return res.status(400).json({ message: 'Old password is incorrect' });
      }
  
      // Hash the new password
      const hashedNewPassword = await bcrypt.hash(newPassword, 12);
  
      // Update the user's password in the database
      user.password = hashedNewPassword;
      await user.save();


        //   // Hash password with bcrypt
        //   const hashedPassword =await bcrypt.hash(password, 12)
            
         
        const fullUpdate = await usersEntries.findByIdAndUpdate(
            user.id,
            {fullName, userName, email, password:hashedNewPassword, phoneNumber},
            {new:true}
        )
        
        
        
        return res.status(200).json({
            message: "successful",
            fullUpdate
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

    const handleForgotUserPassword = async(req, res)=>{

        try {

        const { email } = req.body

        const user = await usersEntries.findOne({email})

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

         const emailSubject = "Reset Wallet Password"

        const response = await sendResetPasswordEmail ( email, emailSubject, Url )
        


        return res.status(200).json({
            message: "Successful"
        })

            
        } catch (error) {
            return res.status(500).json({message: error.message})
            
        }    

    }

    const resetPassword = async(req,res)=>{

        try {   

            const { email, password} = req.body

            const user = await usersEntries.findOne({email})

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


    const getBalance = async(req, res)=>{

        try {

            const user = req.user

            const balance = user.wallet_balance

            return res.status(200).json({
                message: "successful",
                balance
            })

        } catch (error) {

            return res.status(500).json({message: error.message})
            
        }
    }

  

module.exports = {
    handleNewUserRegisteration,
    handleAllUsersDetails,
    handleUsersLogin,
    handleGetOneUser,
    userPasswordUpdate,
    handleFullUpdate,
    handleDeleteUserAccount,
    handleForgotUserPassword,
    handleForgotUserPassword,
    resetPassword,
    disableUserWalletAccount,
    getBalance
}
