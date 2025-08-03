import userSignupModel from "../../Model/userSignupModel.js";

const userSignupController = {
    async create(req, res) {
        try {
            const { name, email, password } = req.body;

            if (!name) throw new Error("Please Enter Your Name");
            if (!email) throw new Error("Please Enter Your Email");
            if (!password) throw new Error("Please Enter Your Password");

            const existingUser = await userSignupModel.findOne({ email });
            if (existingUser) {
                return res.status(400).json({
                    message: "User Already Exists",
                    error: true,
                    success: false,
                });
            }

            const user = new userSignupModel({
                name,
                email,
                password,
                role:"GENERAL"
            });
            await user.save();

            res.status(201).json({
                role: "GENERAL",
                data: user,
                success: true,
                error: false,
                message: "User Created Successfully",
            });
        } catch (err) {
            res.status(500).json({
                message: err.message || "Server Error",
                error: true,
                success: false,
            });
        }
    },
};

export default userSignupController;
