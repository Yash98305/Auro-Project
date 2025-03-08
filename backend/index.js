const dotenv = require("dotenv");
const http = require('http');
const socketIo = require('socket.io');
dotenv.config();
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')


const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

io.on('connection', (socket) => {
    console.log('New client connected');
  
    socket.on('sendMessage', (message) => {
      socket.to(message.receiverId).emit('receiveMessage', message);
    });
  
    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });

app.get("/",(req,res)=>{
    res.status(200).send({
        message : "Welcome to the Web Application"
    })
    
})
const auth = require("./Routes/auth.js")
app.use("/api/v1/auth",auth)
// const item = require("./Routes/item.js")
// app.use("/api/v1/item",item)

module.exports =app