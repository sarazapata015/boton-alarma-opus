import { Server } from "socket.io";

let io;

export default function handler(req, res) {
  if (!io) {
    io = new Server(res.socket.server, {
      path: "/api/socket",
      addTrailingSlash: false
    });

    io.on("connection", (socket) => {
      console.log("Cliente conectado");

      socket.on("triggerAlert", () => {
        socket.broadcast.emit("receiveAlert");
      });
    });

    console.log("Socket.io listo");
  }

  res.end("Servidor Socket.IO activo");
}
