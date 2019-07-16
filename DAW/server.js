const express = require("express");
const app = express();
const PORT =process.env.PORT || 8080;
const path = require('path');

app.use(express.static('./dawXX'));

app.get('*', function (request, response){
    response.sendFile(path.resolve( 'dawXX', 'index.html'));
});

const server = app.listen(PORT, function() {
  console.log(`Listening on Port ${PORT}`);
});

const io = require('socket.io')(server);

// Set socket.io listeners.
io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

const express = require("express");
const app = express();
const PORT =process.env.PORT || 8080;
const path = require('path');

app.use(express.static('./dawXX'));

app.get('*', function (request, response){
    response.sendFile(path.resolve( 'dawXX', 'index.html'));
});

const server = app.listen(PORT, function() {
  console.log(`Listening on Port ${PORT}`);
});

const io = require('socket.io')(server);

const isValidJwt = (header) => {
  const token = header.split(' ')[1];
  if (token === 'abc') {
    return true;
  } else {
    return false;
  }
};

// io.of('/test');
io.use((socket, next) => {
  const header = socket.handshake.headers['authorization'];
  console.log(header);
  if (isValidJwt(header)) {
    return next();
  }
  return next(new Error('authentication error'));
});
io.on('connection', (socket) => {
  socket.on('room', room => {
    console.log(room);
    socket.join(room);
  });
});

setInterval(() => {
  io.sockets.to('room1').emit('message', 'what is going on, party people?');
}, PORT);

setInterval(() => {
  io.sockets.to('room2').emit('message', 'anyone in this room yet?');
}, PORT);

server.listen(PORT);