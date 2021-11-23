const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3000;
const http = require('http');
const server = http.createServer(app)
const io = require("socket.io")(server)

io.on('connection', (socket) => {
  console.log('User connected');


  socket.on('disconnect', () => {
    console.log('User disconnected')
  })

})


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.post('/newImage', (req, res) => {
  // console.log(req.body.image)
  io.emit('newImage', req.body.image);
});


app.use("/", express.static(__dirname + '/public'));

server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});