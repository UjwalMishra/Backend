import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8080 });

interface User {
  socket: WebSocket;
  roomId: string;
}

let allUsers: User[] = [];

wss.on("connection", (socket) => {
  console.log("user connected");

  socket.on("message", (message) => {
    //converting string to JSON
    //@ts-ignore
    const parsedMsg = JSON.parse(message);
    if (parsedMsg.type == "join") {
      console.log("user joined room");

      allUsers.push({
        socket,
        roomId: parsedMsg.payload.roomId,
      });
    }

    if (parsedMsg.type == "chat") {
      console.log("user started chatting");

      const userCurrentRoom = allUsers.find((x) => x.socket == socket)?.roomId;

      const fullMessage = JSON.stringify({
        message: parsedMsg.payload.message,
        username: parsedMsg.payload.username || "Anonymous",
        timestamp: parsedMsg.payload.timestamp || new Date().toISOString(),
      });

      for (let i = 0; i < allUsers.length; i++) {
        if (allUsers[i].roomId === userCurrentRoom) {
          allUsers[i].socket.send(fullMessage);
        }
      }
    }
  });
});
