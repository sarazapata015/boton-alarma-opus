// WebSocket setup para Vercel (usa ws y res.socket.server)
const { Server } = require("ws");

module.exports = (req, res) => {
  if (!res.socket.server.wss) {
    console.log("Creando servidor WebSocket...");
    const wss = new Server({ noServer: true });

    res.socket.server.on("upgrade", (request, socket, head) => {
      if (request.url === "/api/ws") {
        wss.handleUpgrade(request, socket, head, (ws) => {
          wss.emit("connection", ws, request);
        });
      }
    });

    wss.on("connection", (ws) => {
      ws.on("message", (message) => {
        if (message.toString() === "alarma") {
          wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === 1) {
              client.send("play");
            }
          });
        }
      });
    });

    res.socket.server.wss = wss;
  }

  res.end("WebSocket activo");
};
