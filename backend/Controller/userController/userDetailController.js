import userSignupModel from "../../Model/userSignupModel.js";

async function userDetailController(req, res) {
    try {
      
      
      if (!req.userId) {
        return res.status(400).json({
          message: "User ID missing",
          error: true,
          success: false
        });
      }
      
      const user = await userSignupModel.findById(req.userId)
      res.status(200).json({
        data: user,
        error: false,
        success: true,
        message: "User Details"
      })
      
    } catch (err) {
      res.status(500).json({
        message: "Server error",
        success: false,
        error: true
      });
    }
  }

export default userDetailController