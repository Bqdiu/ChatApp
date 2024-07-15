const getUserDetailFromToken = require("../helpers/getUserDetailFromToken");
const userModel = require("../models/UserModel");

async function updateUserDetail(request, response) {
    try {
        const token = request.cookies.token || "";
        const user = await getUserDetailFromToken(token);

        const { name, profile_pic } = request.body;
        const updateUser = await userModel.updateOne({ _id: user._id }, {
            name,
            profile_pic
        });

        const userInformation = await userModel.findById(user._id);

        return response.status(200).json({
            message: 'user update successfully',
            data: userInformation,
            success: true
        })
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true
        })
    }
}

module.exports = updateUserDetail