const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors"); // Import cors package

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*", // Allow frontend to connect from this origin
    methods: ["GET", "POST"], // Allowed HTTP methods
  },
});

// Enable CORS for all routes
app.use(
  cors({
    origin: "*", // Allow frontend to connect from this origin
  })
);

app.get("/", (req, res) => {
  const message = req.query.message || "Default message"; // If no message is provided, use "Default message"
  io.emit("trigger", message);
  res.json({ message });
});

// Socket.IO connection
io.on("connection", (socket) => {
  console.log("connected");

  socket.on("trigger", (msg) => {
    console.log("Message received:", msg);
    io.emit("trigger", msg); // Broadcast message to all clients
  });

  socket.on("disconnect", () => {
    console.log("disconnected");
  });
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server running on port http:localhost:${PORT}`);
});
