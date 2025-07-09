import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8080 });

let userCount = 0;
let allUsers: WebSocket[] = [];

wss.on("connection", (socket) => {
  allUsers.push(socket);

  console.log("user connecetd");
  userCount++;

  socket.on("message", (message) => {
    for (let i = 0; i < allUsers.length; i++) {
      const s = allUsers[i];
      // console.log("Recieved message : ", message.toString());
      s.send(message.toString() + "From server");
    }
  });

  socket.on("close", () => {
    allUsers = allUsers.filter((x) => x != socket);
    console.log("Size : ", allUsers.length);
  });
});
