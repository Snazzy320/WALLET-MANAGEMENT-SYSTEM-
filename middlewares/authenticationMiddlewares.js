const validateDetails = async (req, res, next)=>{

    const { email, password } = req.body

    error = []

    if(!email){
        error.push("please enter email")
    }else if(!ValidateEmailPattern(email)){
        error.push("invalid email")
    }
      
    
     if(!password){
        error.push("please enter password")
    } else if(password.length < 6){
        error.push("password must be 6 characters")
    } else if(!/[0-9]/.test(password)){
        error.push("password must contain a number")
    }

    if(error.length > 0){
        return res.status(400).json({message: error})
    }

    next()   

}


const ValidateEmailPattern = (email)=>{

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ 
    return emailPattern.test(email)
}

const validatePassword = async (req, res, next)=>{

    const { password } = req.body

    error = [  ]

    if(!password){
        error.push("please enter password")
    } else if(password.length < 6){
        error.push("password must be 6 characters")
    } else if(!/[0-9]/.test(password)){
        error.push("password must contain a number")
    }

    if(error.length > 0){
        return res.status(400).json({message: error})
    }

    next()   

}

const validatEmail = async (req, res, next)=>{

    const { email,} = req.body

    error = []

    if(!email){
        error.push("please enter email")
    }else if(!ValidateEmailPattern(email)){
        error.push("invalid email")
    }

    if(error.length > 0){
        return res.status(400).json({message: error})
    }

    next()

}

const validateOldPassword = async (req, res, next)=>{

    const { oldPassword } = req.body

    error = [  ]

    if(!oldPassword){
        error.push("please enter old password")
    } else if(oldPassword.length < 6){
        error.push("old password must be 6 characters")
    } else if(!/[0-9]/.test(oldPassword)){
        error.push("old password must contain a number")
    }

    if(error.length > 0){
        return res.status(400).json({message: error})
    }

    next()   

}

const validateNewPassword = async (req, res, next)=>{

    const { newPassword } = req.body

    error = [  ]

    if(! newPassword ){
        error.push("please enter  new password ")
    } else if(newPassword.length < 6){
        error.push(" new password  must be 6 characters")
    } else if(!/[0-9]/.test(newPassword)){
        error.push(" new password must contain a number")
    }

    if(error.length > 0){
        return res.status(400).json({message: error})
    }

    next()   

}


      

module.exports = {
    validateDetails,
    ValidateEmailPattern,
    validatePassword,
    validatEmail,
    validateOldPassword,
    validateNewPassword
}