import tokenAuthentication from "../Middleware/tokenAuthentication.js";
import userDetailController from "../Controller/userController/userDetailController.js";
import express from "express"

const router = express.Router()
router.use(express.json())

router.get("/getDetails",tokenAuthentication,userDetailController)

export default router