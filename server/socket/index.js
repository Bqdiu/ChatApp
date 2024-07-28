const express = require('express');
const app = express();
const htpp = require('http');
const server = htpp.createServer(app);
const { Server } = require('socket.io');
const getUserDetailFromToken = require('../helpers/getUserDetailFromToken')

const io = new Server(server, {
    cors: {
        origin: process.env.FRONTEND_URL,
        credentials: true
    }
});

io.on('connection', async (socket) => {
    console.log('A user connected, id: ', socket.id);
    const token = socket.handshake.auth.token;
    // current user
    const user = await getUserDetailFromToken(token);
    console.log('User', user);
    io.on('disconnect', (socket) => {
        console.log('Disconnect user ', socket.id);
    })
})

module.exports = {
    app,
    server
}