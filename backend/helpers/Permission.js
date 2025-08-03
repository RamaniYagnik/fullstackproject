import userSignupModel from "../Model/userSignupModel.js";

const uploadProductPermission = async(userId) => {

    const user = await userSignupModel.findOne({ _id: userId })

    if (user?.role !== 'ADMIN') {
        return false
    }

    return true

}

export default uploadProductPermission