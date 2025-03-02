const WebSocket = require("ws");

const server = new WebSocket.Server({ port: 8080 });

let clients = [];

server.on("connection", (socket) => {
    console.log("🔵 New player connected!");

    clients.push(socket);

    socket.on("message", (message) => {
        console.log("📨 Received:", message);

        // ارسال پیام به همه کلاینت‌ها
        clients.forEach((client) => {
            if (client !== socket && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    socket.on("close", () => {
        console.log("❌ Player disconnected");
        clients = clients.filter((client) => client !== socket);
    });
});

console.log("✅ WebSocket Server running on ws://localhost:8080");
