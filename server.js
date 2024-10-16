const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(express.static('public'));

let users = [];

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.on('join', (username) => {
    users.push({ id: socket.id, username });
    socket.broadcast.emit('newUser', username);
  });

  socket.on('sendMessage', (message) => {
    socket.broadcast.emit('newMessage', { username: users.find((user) => user.id === socket.id).username, message });
  });

  socket.on('disconnect', () => {
    const userIndex = users.findIndex((user) => user.id === socket.id);
    if (userIndex!== -1) {
      users.splice(userIndex, 1);
      socket.broadcast.emit('userLeft', users.find((user) => user.id === socket.id).username);
    }
  });
});

server.listen(3000, () => {
  console.log('Server started on port 3000');
});
