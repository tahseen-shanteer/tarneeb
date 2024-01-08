const cors = require('cors');
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            
    optionSuccessStatus:200
}
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);


app.use(cors(corsOptions));

const PORT = 4000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);
    });
  
    socket.on('joinRoom', (playerName, room) => {
        socket.join(room);
        console.log(`User ${socket.id} joined room ${room}`);
        io.to(room).emit('playerJoined');
    });

    socket.on('createRoom', (roomName) => {
        console.log(`Room ${roomName} created.`);
        socket.join(roomName);
    });

    // send signal to room that a player joined team 1
    socket.on('team1Join', (room) => {
        console.log(`Team joined in room ${room}`);
        io.to(room).emit('team1Joined');
    });

     // send signal to room that a player joined team 1
     socket.on('team2Join', (room) => {
        console.log(`Team joined in room ${room}`);
        io.to(room).emit('team2Joined');
    });

    socket.on('startingGame', (room) => {
        console.log("starting game");
        io.to(room).emit("gameStarted", room);
    });

    socket.on('bidPlaced',(room, bid, name) =>{
        console.log("bid placed");
        io.to(room).emit("newBid", bid, name);
    });

    socket.on('passOccured', (room) =>{
        console.log("someone passed");
        io.to(room).emit("passIncrement");
    });

});

  