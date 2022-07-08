const express = require('express');
const app = express();
const http = require('http');
const { Server } = require("socket.io");
const cors = require("cors")

app.use(cors())

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],

    }
});

io.on('connection', (socket) => {
    console.log(`user: ${socket.id}`)
    socket.on('send_message', (data) => {
        data.user = socket.id
        console.log(data)
        socket.broadcast.emit("receive_message", data)
    });
});

server.listen(3001, () => {
    console.log('listening on *:3000');
});

/*
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });
});
 */