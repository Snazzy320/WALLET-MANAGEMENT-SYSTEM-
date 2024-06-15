const validateRegistration = async (req, res, next)=>{

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

module.exports = {
    validateRegistration,
    ValidateEmailPattern,
    validatePassword 
}