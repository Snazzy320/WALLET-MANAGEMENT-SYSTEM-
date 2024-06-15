const express = require("express")

const userCtrl = require("../controllers/userController")
const transCtrl = require("../controllers/transactionController")

const router = express.Router()



router.post("/credit", transCtrl.handleCredit)
router.put("/debit", transCtrl.handleDebit)
router.get("/balance/:id", userCtrl.getBalance)
router.get("/history", transCtrl.handleHistory)





module.exports = router