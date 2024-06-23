const express = require("express")

const adminCtrl = require("../controllers/adminController")
const  { validateDetails, validatEmail,validatePassword,} =require("../middlewares/authentication-1")
const  {  verifyUser, verifyAdmin } =require("../middlewares/authentication-2")




const router = express.Router()



router.post("/register", validateDetails,  adminCtrl. registerAdmin )
router.post("/login",  adminCtrl. adminLogin )
router.get("/get-all-users",verifyAdmin, adminCtrl. handleAllUsersDetails )
router.get("/get-one-user/:id",verifyAdmin, adminCtrl.handleGetOneUser)
router.get("/history/:id",verifyAdmin, adminCtrl. userTransactionHistory )
router.delete("/delete-user-account/:id",verifyAdmin, adminCtrl.handleDeleteUserAccount )
router.post("/disable-user/:id",verifyAdmin, adminCtrl.disableUserWalletAccount )
router.post("/forgot-password",validatEmail, adminCtrl. ForgotAdminPassword)
router.post("/reset-password", validatEmail,validatePassword, adminCtrl. resetAdminPassword)

module.exports = router