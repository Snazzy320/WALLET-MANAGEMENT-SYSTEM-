const express = require("express")

const { handleNewUserRegisteration,  handleAllUsersRegistration } = require("../controllers/userController")

const router = express.Router()


router.post("/register", handleNewUserRegisteration)
router.get("/get-all-users", handleAllUsersRegistration)

handleNewUserRegisteration

module.exports = router