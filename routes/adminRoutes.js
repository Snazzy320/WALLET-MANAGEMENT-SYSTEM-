const express = require("express")

const adminCtrl = require("../controllers/adminController")
const  { validateDetails, validatEmail,validatePassword,} =require("../middlewares/authentication-1")
const  { verifyAdmin, checkAdminRole } =require("../middlewares/authentication-2")




const router = express.Router()



router.post("/register", validateDetails,  adminCtrl. registerAdmin )
router.post("/login",  adminCtrl. adminLogin )
router.get("/get-all-users",verifyAdmin,checkAdminRole, adminCtrl. handleAllUsersDetails )
router.get("/get-one-user/:id",verifyAdmin,checkAdminRole, adminCtrl.handleGetOneUser)
router.get("/history/:id",verifyAdmin,checkAdminRole, adminCtrl. userTransactionHistory )
router.delete("/delete-user-account/:id",verifyAdmin,checkAdminRole, adminCtrl.handleDeleteUserAccount )
router.post("/disable-user/:id",verifyAdmin,checkAdminRole, adminCtrl.disableUserWalletAccount )
router.post("/forgot-password",validatEmail, adminCtrl. ForgotAdminPassword)
router.post("/reset-password", validatEmail,validatePassword, adminCtrl. resetAdminPassword)

module.exports = router