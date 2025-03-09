const express = require("express");
const http = require("http"); // Required for WebSockets
const { Server } = require("socket.io");
const dotenv = require('dotenv');
const errorMiddleware = require("./middlewares/error.js");
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
        origin: "*", // Allow all origins (update this for production)
        methods: ["GET", "POST"]
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
io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on("joinRoom", ({ itemId, userId, sellerId }) => {
        const roomId = `chat_${itemId}_${userId}_${sellerId}`;
        socket.join(roomId);
    });

     socket.on("sendMessage", (message) => {
        const roomId = `chat_${message.itemId}_${message.senderId}_${message.receiverId}`;
        io.to(roomId).emit("receiveMessage", message);
    });

    // Handle disconnection
    socket.on("disconnect", () => {
        console.log(`User disconnected: ${socket.id}`);
    });
});

app.use(errorMiddleware);

module.exports = { app, server }; 