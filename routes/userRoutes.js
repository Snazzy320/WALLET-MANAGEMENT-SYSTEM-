const express = require("express")

const ctrl = require("../controllers/userController")
const  { validateRegistration, validatePassword, validatEmail  } =require("../middlewares/authenticationMiddlewares")


const router = express.Router()


router.get("/get-all-users", ctrl.handleAllUsersDetails )
router.get("/get-one-user/:id", ctrl.handleGetOneUser)
router.post("/add-user",validateRegistration, ctrl.handleNewUserRegisteration)
router.post("/login-user", ctrl.handleUsersLogin)
router.put("/full-update/:id", ctrl. handleFullUpdate )
router.patch("/update-user-password/:id",validatePassword, ctrl.userPasswordUpdate )
router.delete("/delete-user-account/:id", ctrl.handleDeleteUserAccount )
router.post("/forgot-password", validatEmail, ctrl.handleForgotUserPassword )
router.post("/reset-password", ctrl.resetPassword )
router.post("/disable-user/:id", ctrl.disableUserWalletAccount )





module.exports = router