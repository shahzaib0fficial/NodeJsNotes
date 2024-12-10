const socket = io("http://localhost:3000")

// Connecting with server and when the socket is connected this runs
socket.on("connect",(response) => {
    // console.log(response);
})

// message is what we are sending from server (it should be same as the server emmiting key)
socket.on("message",(data)=>{
    console.log(`Message From Server: ${data}`)

    // Sending message to the server
    socket.emit("message","Hey Server")
})