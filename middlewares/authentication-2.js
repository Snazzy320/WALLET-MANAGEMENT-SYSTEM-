const jwt = require("jsonwebtoken")
const usersEntries = require("../model/usersModel")
const adminEntries = require("../model/adminModel")

const verifyUser = async(req, res, next) =>{
    try {

        // user token

        const tk = req.header ("Authorization")

        const tokenArray = tk.split(" ")

        const token = tokenArray [1]

        const verifiedToken = jwt.verify(token, `${process.env.ACCESS_TOKEN}`)

        if(!verifiedToken) {
            return res.status(401).json({message: "Access Denied"})
        }

        // const user = await usersEntries.findOne({email: verifiedToken.email})
        const user = await usersEntries.findOne({_id: verifiedToken.id})

        

        if(!user) {
            return res.status(404).json({message: "user not found"})
        }
         req.user = user
         
        next()

        console.log({user});
        
    } catch (error) {

        return res.status(500).json({ message: error.message})
        
    }
}


const verifyAdmin = async(req, res, next) =>{
    try {

        // user token

        const tk = req.header ("Authorization")

        const tokenArray = tk.split(" ")

        const token = tokenArray [1]

        const verifiedToken = jwt.verify(token, `${process.env.ACCESS_TOKEN}`)

        if(!verifiedToken) {
            return res.status(401).json({message: "Access Denied"})
        }

        // const user = await adminEntries.findOne({email: verifiedToken.email})
        const user = await adminEntries.findOne({_id: verifiedToken.id})

        

        if(!user) {
            return res.status(404).json({message: "user not found"})
        }
         req.user = user
         
        next()

        console.log({user});
        
    } catch (error) {

        return res.status(500).json({ message: error.message})
        
    }
}

const checkAdminRole = (req, res, next) => {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access forbidden: Admins only' });
    }
    next();
  };
  


module.exports = {
    verifyUser,
    verifyAdmin,
    checkAdminRole
}