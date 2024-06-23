const express = require("express")

const adminCtrl = require("../controllers/adminController")
const  { validateDetails, validatEmail,validatePassword,} =require("../middlewares/authentication-1")
const  {  verifyUser  } =require("../middlewares/authentication-2")




const router = express.Router()



router.post("/register", validateDetails,  adminCtrl. registerAdmin )
router.post("/login",  adminCtrl. adminLogin )
router.get("/get-all-users", adminCtrl. handleAllUsersDetails )
router.get("/get-one-user/:id", adminCtrl.handleGetOneUser)
router.delete("/delete-user-account/:id", adminCtrl.handleDeleteUserAccount )
router.post("/disable-user/:id", adminCtrl.disableUserWalletAccount )
router.post("/forgot-password",validatEmail, adminCtrl. ForgotAdminPassword)
router.post("/reset-password", validatEmail,validatePassword, adminCtrl. resetAdminPassword)

module.exports = router