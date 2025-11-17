import { Server } from "socket.io";

export default function handler(req, res) {
  if (!res.socket.server.io) {
    console.log("🔌 Iniciando Socket.io...");

    const io = new Server(res.socket.server, {
      path: "/api/socket",
      addTrailingSlash: false,
      cors: {
        origin: "*",
      }
    });

    io.on("connection", (socket) => {
      console.log("Cliente conectado");

      socket.on("triggerAlert", () => {
        io.emit("receiveAlert");
      });
    });

    res.socket.server.io = io;
  } else {
    console.log("🔁 Socket.io ya estaba listo.");
  }

  res.end();
}
