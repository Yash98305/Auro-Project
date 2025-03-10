const express = require("express");
const http = require("http"); // Required for WebSockets
const { Server } = require("socket.io");
const dotenv = require('dotenv');
const userRoute = require('./routes/userRoute.js');
const itemRoute = require('./routes/itemRoute.js');
const messageRoute = require('./routes/messageRoute.js'); // Add chat route
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cookieParser = require("cookie-parser");
const cors = require('cors');

dotenv.config();

const app = express();
const server = http.createServer(app); // Create HTTP Server
const io = new Server(server, {
    cors: {
        origin: "https://auro-yashpatel.netlify.app", // Allow all origins (update this for production)
        methods: ["GET", "POST","PATCH","PUT","DELETE"]
    }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/v1/user', userRoute);
app.use('/api/v1/item', itemRoute);
app.use('/api/v1/message', messageRoute); // Add chat routes

app.get('/', (req, res) => {
    res.send({ message: "Welcome to Scaler Application" });
});

// WebSocket Connection
let users = [];

const addUser = (userData, socketId) => {
    !users.some(user => user.id === userData.id) && users.push({ ...userData, socketId });
}

const removeUser = (socketId) => {
    users = users.filter(user => user.socketId !== socketId);
}

const getUser = (userId) => {
    return users.find(user => user.id === userId);
}

io.on('connection',  (socket) => {
    console.log('user connected')

    //connect
    socket.on("addUser", userData => {
        addUser(userData, socket.id);
        io.emit("getUsers", users);
    })

    //send message
    socket.on('sendMessage', (data) => {
        const user = getUser(data.receiverId);
        user && io.to(user.socketId).emit('getMessage', data)
    })

    //disconnect
    socket.on('disconnect', () => {
        console.log('user disconnected');
        removeUser(socket.id);
        io.emit('getUsers', users);
    })})
app.use(require("./middlewares/error"));

module.exports = { app, server };