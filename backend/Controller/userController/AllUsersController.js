import userSignupModel from '../../Model/userSignupModel.js'

async function allUsersController(req,res) {
    try {
        const Allusers = await userSignupModel.find()

        res.json({
            message: "All Users",
            data : Allusers,
            error : false,
            success : true
        })
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}

export default allUsersController