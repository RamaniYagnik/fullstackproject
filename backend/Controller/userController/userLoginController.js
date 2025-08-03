import userSignupModel from "../../Model/userSignupModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userLoginController = {

    async login(req,res){

        try {
            
            const { email, password } = req.body

            if (!email) throw new Error("Please Enter Your email");
            if (!password) throw new Error("Please Enter Your password");

            const user = await userSignupModel.findOne({ email })

            if(!user) throw new Error("User Not Found")

            const checkPassword = await bcrypt.compare(password,user.password)

            if(checkPassword){

                const tokenData = {
                    _id: user._id,
                    email: user.email,
                }

                const token = await jwt.sign(tokenData, process.env.SECRET_KEY)

                const tokenOption = {
                    httpOnly: true,
                    secure: false, 
                    sameSite: 'Lax'
                };
                
                res.cookie("token", token, tokenOption).json({
                    message: "Login Successfull...",
                    data: token,
                    success: true,
                    error: false
                });
                

            } else{
                throw new Error("Check password")
            }

        } catch (err) {
            res.status(500).json({
                message: err.message || "Server Error",
                error: true,
                success: false,
            });
        }

    }

}

export default userLoginController