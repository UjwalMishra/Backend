//creating web server
import { WebSocketServer } from "ws";

const PORT = 8080;
//initializing
const wss = new WebSocketServer({ port: PORT });

wss.on("connection", (socket) => {
  console.log("User connected");
  socket.on("message", (e) => {
    if (e.toString()) {
      socket.send(e.toString());
    }
  });
});
