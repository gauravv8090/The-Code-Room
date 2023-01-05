const express = require('express');
const app = express();
const http = require('http');
const path = require('path');
const {Server} = require('socket.io');
const ACTIONS = require('./src/Actions');


app.use(express.static('build'));
app.use((req, res, next)=>{
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

const server = http.createServer(app);

const io = new Server(server);


const userSocketMap = {};

const getAllConnectedClients = (roomID)=>{
    
   return Array.from(io.sockets.adapter.rooms.get(roomID) || [] ).map((socketId)=>{
      return {
        socketId,
        userName : userSocketMap[socketId] 
      }
   });
}

io.on('connection', (socket)=>{
    console.log('socket connected', socket.id);

       socket.on(ACTIONS.JOIN, ({roomID, userName})=>{
        userSocketMap[socket.id] = userName;
        socket.join(roomID);
        const clients = getAllConnectedClients(roomID);
        clients.forEach(({socketId})=>{
            io.to(socketId).emit(ACTIONS.JOINED, {
                clients,
                userName,
                socketId : socket.id
            })
        })
    });

    socket.on(ACTIONS.CODE_CHANGE, ({roomID, code})=>{
        socket.in(roomID).emit(ACTIONS.CODE_CHANGE, {code});
    })
    socket.on(ACTIONS.SYNC_CODE, ({socketId, code})=>{
        io.to(socketId).emit(ACTIONS.CODE_CHANGE, {code});
    })

    socket.on('disconnecting', ()=>{
        const rooms  = [...socket.rooms];
        rooms.forEach((roomId)=>{
            socket.in(roomId).emit(ACTIONS.DISCONNECT, {
                socketId: socket.id,
                userName: userSocketMap[socket.id],
            });
        });
        delete userSocketMap[socket.id];
        socket.leave();
    })
});


const PORT = process.env.PORT || 5050;
server.listen(PORT, ()=>{
    console.log('listening on port ', PORT);
})

