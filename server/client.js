const socket = new WebSocket('ws://localhost:8080');

socket.onopen = () => {
  console.log('Connected to the server');
  socket.send('Hello Server!');
};

socket.onmessage = (event) => {
  console.log('Message from server:', event.data);
};

socket.onclose = () => {
  console.log('Disconnected from the server');
};
