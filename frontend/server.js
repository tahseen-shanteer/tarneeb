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

const PORT = 3001;

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

    socket.on('teamJoin', (room) => {
        console.log(`Team joined in room ${room}`);
        io.to(room).emit('teamJoined');
    });
});

  