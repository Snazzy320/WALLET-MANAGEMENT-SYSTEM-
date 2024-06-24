const express = require("express")

const ctrl = require("../controllers/userController")
const  { validatePhoneNumber, validateDetails, validatePassword, validatEmail, validateOldPassword, validateNewPassword } =require("../middlewares/authentication-1")
const  {  verifyUser } =require("../middlewares/authentication-2")

const router = express.Router()


router.post("/register", validatePhoneNumber, validateDetails, ctrl.handleNewUserRegisteration)
router.post("/login-user", ctrl.handleUsersLogin)
router.put("/full-update",verifyUser, validatEmail, validateOldPassword,validateNewPassword, validatePhoneNumber, ctrl. handleFullUpdate )
router.patch("/update-user-password", verifyUser, validateOldPassword,validateNewPassword, validatePhoneNumber, ctrl.userPasswordUpdate )
router.delete("/delete-user-account",verifyUser,  ctrl.handleDeleteUserAccount )
router.post("/forgot-password", validatEmail, ctrl.handleForgotUserPassword )
router.post("/reset-password", validatEmail,validatePassword, ctrl.resetPassword )
router.post("/disable-user",verifyUser, ctrl.disableUserWalletAccount )





module.exports = router