import userSignupController from "../Controller/userController/userSignupController.js";
import express from "express";

const router = express.Router()
router.use(express.json())

router.post("/signup",userSignupController.create)

export default router