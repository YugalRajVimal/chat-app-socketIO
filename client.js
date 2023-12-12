// Import necessary modules here.
import readline from "readline";
import { io } from "socket.io-client";

// Creating an interface to read input from the user in Node.js using the readline module.
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

let username;

rl.question("Enter your name : ", (name) => {
  username = name;

  // Connecting to the Server
  const socket = io.connect("http://localhost:9090");

  console.log(username);

  if (username) {
    process.stdout.write("Me : ");

    //Reading the input message
    rl.on("line", (msg) => {
      process.stdout.clearLine();
      process.stdout.cursorTo(0);
      socket.emit("chat-msg", `${username}: ${msg}`);
      process.stdout.write("Me: ");
    });

    //Broadcast the message comming from server on event "chat-msg"
    socket.on("chat-msg", (msg) => {
      process.stdout.clearLine();
      process.stdout.cursorTo(0);
      console.log(msg);
      process.stdout.write("Me: ");
    });
  }
});
