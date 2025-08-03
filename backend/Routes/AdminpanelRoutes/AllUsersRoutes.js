import allUsersController from "../../Controller/userController/AllUsersController.js";
import tokenAuthentication from "../../Middleware/tokenAuthentication.js";
import express from 'express'

const router = express.Router()

router.get("/allusers",tokenAuthentication,allUsersController)

export default router