"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//creating web server
const ws_1 = require("ws");
const PORT = 8080;
//initializing
const wss = new ws_1.WebSocketServer({ port: PORT });
wss.on("connection", (socket) => {
    console.log("User connected");
    socket.on("message", (e) => {
        if (e.toString()) {
            socket.send(e.toString());
        }
    });
});
