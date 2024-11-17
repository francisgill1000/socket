const io = require('socket.io')(3000, {
    cors: {
      origin: "*", // Allow any origin (you can specify your frontend's URL for security)
      methods: ["GET", "POST"]
    }
  });
  
  io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);
  
    // Handle receiving progress updates from a source
    socket.on('progressUpdate', (data) => {
      console.log(`Received progress update for job ${data.jobId}: ${data.progress}%`);
  
      // Broadcast the progress update to all clients
      io.emit('progressUpdate', data);
    });
  
    socket.on('disconnect', () => {
      console.log('A user disconnected:', socket.id);
    });
  });
  
  console.log('Socket server running on port 3000');
  