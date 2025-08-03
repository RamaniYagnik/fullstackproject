import userLoginController from "../Controller/userController/userLoginController.js";
import express from 'express';

const router = express();
router.use(express.json());

router.post("/login",userLoginController.login)

export default router