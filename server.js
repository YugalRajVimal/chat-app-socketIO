// Import necessary modules here.
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

// Create an instance of the Express web application framework in Node.js
const app = express();

// Create HTTP server
const server = createServer(app);

// Create a new instance of the Socket.IO server
const io = new Server(server);

// Sets up an event listener for the "connection" event in Socket.IO
io.on("connection", (socket) => {
  console.log("Connection Started............!!");

  // Recieve custom events from the client - ("chat-msg")

  socket.on("join", (username) => {
    socket.emit("join", username);

    socket.on("chat-msg", (msg) => {
      //Print message on server's console

      //Broadcast the Message to every client on custom event ("chat-msg")
      socket.broadcast.emit("chat-msg", msg);

      // Sets up an event listener for the "disconnect" event in Socket.IO
      socket.on("disconnect", () => {
        console.log("User disconnected.......");
      });
    });
  });
});

server.listen(9090, () => {
  console.log("Server running on 9090.........");
});
