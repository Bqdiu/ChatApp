const bcryptjs = require('bcryptjs');
const userModel = require('../models/UserModel');
const jwt = require('jsonwebtoken');
require('dotenv').config();
async function checkPassword(request, response) {
    try {
        const { password, userId } = request.body;
        const user = await userModel.findById(userId);
        const verifyPassword = await bcryptjs.compare(password, user.password);
        
        if(!verifyPassword){
            return response.status(400).json({
                message: 'Incorrect password',
                error: true
            })
        };

        const tokenData = {
            id: user._id,
            email: user.email
        };

        const token = await jwt.sign(tokenData,process.env.JWT_SECRET_KEY, {expiresIn: '1d'});

        const cookieOptions = {
            http: true,
            secure: true
        }

        return response.cookie('token',token,cookieOptions).status(200).json({
            message: 'Login succesfully bro',
            token: token,
            success: true,
        });

        
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true
        })
    }
}

module.exports = checkPassword