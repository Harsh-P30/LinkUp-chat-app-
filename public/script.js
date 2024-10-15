const socket = io();
let username;

document.getElementById('join-btn').addEventListener('click', () => {
  username = document.getElementById('username').value;
  socket.emit('join', username);
  document.getElementById('username').disabled = true;
  document.getElementById('join-btn').disabled = true;
  document.getElementById('message').focus();
});

document.getElementById('send-btn').addEventListener('click', () => {
  const message = document.getElementById('message').value;
  socket.emit('sendMessage', message);
  document.getElementById('message').value = '';
});

socket.on('newUser', (username) => {
  document.getElementById('chat-log').innerHTML += `<p><strong>${username}</strong> has joined the chat!</p>`;
});

socket.on('newMessage', (data) => {
  document.getElementById('chat-log').innerHTML += `<p><strong>${data.username}</strong>: ${data.message}</p>`;
});

socket.on('userLeft', (username) => {
  document.getElementById('chat-log').innerHTML += `<p><strong>${username}</strong> has left the chat!</p>`;
});
