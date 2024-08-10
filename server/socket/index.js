const express = require('express');
const app = express();
const htpp = require('http');
const server = htpp.createServer(app);
const { Server } = require('socket.io');
const getUserDetailFromToken = require('../helpers/getUserDetailFromToken');
const userModel = require('../models/UserModel');

// online user
const onlineUser = new Set();

const io = new Server(server, {
    cors: {
        origin: process.env.FRONTEND_URL,
        credentials: true
    }
});

io.on('connection', async (socket) => {
    console.log('Connect user: ', socket.id);
    const token = socket.handshake.auth.token;
    // current user
    const user = await getUserDetailFromToken(token);

    //create a room
    socket.join(user?._id);
    onlineUser.add(user?._id?.toString());
    
    io.emit('onlineUser',Array.from(onlineUser));

    socket.on('message-page', async(userId) => {
        console.log('UserId',userId);
        const userDetails = await userModel.findById(userId).select('-password');
        const payload = {
            _id: userDetails?._id,
            name: userDetails?.name,
            email: userDetails?.email,
            profile_pic: userDetails?.profile_pic,
            online: onlineUser.has(userId),
        }
        socket.emit('message-user',payload);
    })
    socket.on('disconnect', () => {
        onlineUser.delete(user?.id);
        console.log('Disconnect user ', socket.id);
    })
})

module.exports = {
    app,
    server
}