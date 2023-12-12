// Import necessary modules here.
import readline from "readline";
import { io } from "socket.io-client";

// Creating an interface to read input from the user in Node.js using the readline module.
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

// Creating a Socket.IO connection to the server at "https://chat-app-socketio-inpt.onrender.com".
const socket = io("https://chat-app-socketio-inpt.onrender.com");

// Sets up an event listener for the "connect" event in Socket.io
socket.on("connect", () => {
  console.log("Connected to Server!!!");

  let username;

  // Taking input as username
  rl.question("Enter your Username: ", (line) => {
    rl.on("line", () => {
      username = line;
      socket.emit("join", username);
    });
    //Read next line for new message
    process.stdout.write("Me : ");
    rl.on("line", (msg) => {
      process.stdout.clearLine();
      process.stdout.cursorTo(0);

      // Send custom events from the client to the server - ("chat-msg")
      socket.emit("chat-msg", `${username}: ${msg}`);

      process.stdout.write("Me: ");
    });
  });
});

//Recieve Broadcasted Message from the Server on custom event ("chat-msg")
socket.on("join", (username) => {
  console.log(username + " Joined");

  socket.on("chat-msg", (msg) => {
    process.stdout.clearLine();
    process.stdout.cursorTo(0);

    //Print the message on every clients terminal. (Broadcast Message)
    console.log(msg);

    process.stdout.write("Me: ");
  });
});
