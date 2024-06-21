const express = require("express")

const userCtrl = require("../controllers/userController")
const transCtrl = require("../controllers/transactionController")
const  {  verifyUser  } =require("../middlewares/authentication-2")



const router = express.Router()



router.post("/credit", verifyUser,  transCtrl. handleCredit)
router.patch("/debit", verifyUser, transCtrl. handleDebit)
router.get("/balance", verifyUser, userCtrl. getBalance)
router.get("/history",verifyUser, transCtrl.  handleHistory)

module.exports = router