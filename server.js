const express = require("express");
const app = express();
const PORT =process.env.PORT || 8080;
const path = require('path');

app.use(express.static('./dawXX'));

app.use(express.json());
const courses = [
  { id: 1, name: "Algorithms" },
  { id: 2, name: "Software Engineering" },
  { id: 3, name: "Human Computer Interaction" }
];

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