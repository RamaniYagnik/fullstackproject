import userSignupModel from "../../Model/userSignupModel.js"

async function updateUser(req,res) {
    
    try {

        const currentUser = req.userId

        const { userId, email, name, role } = req.body
    
        const payload = {
            ...( email && { email : email } ),
            ...( name && { name : name } ),
            ...( role && { role : role } )
        }

        const user = await userSignupModel.findById(currentUser)

        const updateUser = await userSignupModel.findByIdAndUpdate(userId, payload, {new:true})
        res.json({
            message: "User Updated Successfully...",
            error: false,
            success: true,
            data: updateUser
        })

    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }

}

export default updateUser