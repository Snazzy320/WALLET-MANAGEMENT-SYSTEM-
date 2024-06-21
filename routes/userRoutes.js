const express = require("express")

const ctrl = require("../controllers/userController")
const  {validateDetails, validatePassword, validatEmail, validateOldPassword, validateNewPassword } =require("../middlewares/authentication-1")


const router = express.Router()


router.get("/get-all-users", ctrl.handleAllUsersDetails )
router.get("/get-one-user/:id", ctrl.handleGetOneUser)
router.post("/add-user",validateDetails, ctrl.handleNewUserRegisteration)
router.post("/login-user", ctrl.handleUsersLogin)
router.put("/full-update/:id",validateDetails, ctrl. handleFullUpdate )
router.patch("/update-user-password",validateOldPassword,validateNewPassword, ctrl.userPasswordUpdate )
router.delete("/delete-user-account/:id", ctrl.handleDeleteUserAccount )
router.post("/forgot-password", validatEmail, ctrl.handleForgotUserPassword )
router.post("/reset-password",validatePassword, ctrl.resetPassword )
router.post("/disable-user/:id", ctrl.disableUserWalletAccount )





module.exports = router