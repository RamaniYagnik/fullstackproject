import updateUsercontroller from "../../Controller/userController/updateUsercontroller.js";
import tokenAuthentication from "../../Middleware/tokenAuthentication.js";
import express from "express";

const router = express.Router()

router.post("/update",tokenAuthentication,updateUsercontroller)

export default router