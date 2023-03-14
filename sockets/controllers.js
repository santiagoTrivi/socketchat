const { Socket } = require("socket.io");
const { checkJwtFrontend } = require("../helpers");
const { ChatMessages } = require("../models");

const chatMessages = new ChatMessages();

const socketController = async (socket = new Socket(), io ) => {


    let user = await checkJwtFrontend(socket.handshake.headers['authorization']);
    
    if(!user) return socket.disconnect();
    
    user = user.dataValues;
    delete user.password;
    // adding the connected user
    chatMessages.connectUser(user);

    io.emit('users-on', chatMessages.usersArray);

    socket.on('disconnect', () => {
        chatMessages.disconnect(user.id);
        io.emit('users-on', chatMessages.usersArray);
    });

    socket.on('send-message', (payload) =>{
        const {message, uid} = payload;
        
        chatMessages.sendMessage(user.id, user.name, message);

        io.emit('recieve-messages', chatMessages.last10messages);
    })


};

module.exports = {
    socketController
}