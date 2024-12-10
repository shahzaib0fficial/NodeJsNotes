const { createServer } = require("http");
const { Server } = require("socket.io");

// Creating a server
const httpServer = createServer();

// Creating a socket
const socket = new Server(httpServer, {
    // adding access
    cors: {
        origin: 'http://127.0.0.1:5500'
    }
});

// this calls when the connecting is made
socket.on('connection',(socket)=>{
    // console.log("Connection is made.");

    // Sending message to the client
    socket.emit("message", "Hello Client");

    // Recieving message from client
    socket.on("message",(data)=>{
        console.log(`Message From Client: ${data}`)
    })
})

// Making Server Live
httpServer.listen(3000, ()=>{
    console.log("Server is connected");
})