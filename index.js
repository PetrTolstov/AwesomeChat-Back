const express = require('express');
const app = express();
const http = require('http');
const { Server } = require("socket.io");
const cors = require("cors")
require("dotenv").config()

const PORT = process.env.PORT || 3000

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 204 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors())
/*app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
*/

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",  //"https://awesome-app-back.herokuapp.com/:3001"

    }
});

io.on('connection', (socket) => {
    console.log(`user: ${socket.id}`)
    socket.on('send_message', (data) => {
        data.user = socket.id
        console.log(data)
        //socket.broadcast.emit("receive_message", data)

        io.emit('receive_message', data);

    });
});

server.listen(PORT, () => {
    console.log('listening on *:' + PORT);
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