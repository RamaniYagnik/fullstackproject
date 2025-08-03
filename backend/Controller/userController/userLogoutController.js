async function userLogoutController(req,res) {
    try {
        res.clearCookie("token")

        res.json({
            message:"Logged Out Successfully...",
            success: true,
            error: false
        })
    } catch (err) {
        res.status(500).json({
            message: err.message || "Server Error",
            error: true,
            success: false,
        });
    }
}

export default userLogoutController