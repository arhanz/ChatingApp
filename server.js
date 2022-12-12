const express = require("express");
const path = require("path");

const app = express();
const server = require("http").createServer(app)

const io = require("socket.io")(server);

app.use(express.static(path.join(__dirname+"/pages")));

io.on("connection", function(socket){
    socket.on("newuser", function(username){
        socket.broadcast.emit("update", username + " joined this conversation");
    });
    socket.on("exituser", function(username){
        socket.broadcast.emit("update", username + " left this conversation");
    })
    socket.on("chat", function(message){
        socket.broadcast.emit("chat", message);
    })
});

server.listen(2022, function(){
    console.log("Server is running on Port: 2022");
}) 