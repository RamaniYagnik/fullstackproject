import userLogoutController from "../Controller/userController/userLogoutController.js";
import express from 'express'

const router = express.Router()
router.use(express.json())

router.get("/logout",userLogoutController)

export default router