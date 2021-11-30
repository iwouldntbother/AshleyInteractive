const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3000;
const http = require('http');
const server = http.createServer(app)
const io = require("socket.io")(server)

const fs = require('fs')



io.on('connection', (socket) => {
  console.log('User connected');

  // fs.appendFile('./data.json', JSON.stringify(tempData), (err) => {
  //   if (err) throw err;
  //   console.log('The data was appended successfully!')
  // })

  socket.on('disconnect', () => {
    console.log('User disconnected')
  })

})


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.post('/newImageText', (req, res) => {
  var tempData = {
    name: req.body.name,
    timeStarted: req.body.time,
    timeSpent: req.body.timeSpent,
    image: req.body.imageText
  }

  io.emit('newImageText', req.body.imageText);
  console.log(req.body.name, req.body.time);

  fs.readFile('data.json', (err, data) => {
    if (err) throw err;
    var json = JSON.parse(data)
    json.push(tempData);
    fs.writeFile('data.json', JSON.stringify(json), (err) => {
      if (err) throw err;
      // console.log('The data was appended successfully!')
    })
  })
})


app.post('/newImage', (req, res) => {
  var tempData = {
    name: req.body.name,
    timeStarted: req.body.time,
    timeSpent: req.body.timeSpent,
    image: req.body.image
  };
  // console.log(req.body.image)
  io.emit('newImage', req.body.image);
  console.log(req.body.name, req.body.time);

  fs.readFile('data.json', (err, data) => {
    if (err) throw err;
    var json = JSON.parse(data)
    json.push(tempData);
    fs.writeFile('data.json', JSON.stringify(json), (err) => {
      if (err) throw err;
      // console.log('The data was appended successfully!')
    })
  })

});


app.use("/", express.static(__dirname + '/public'));

server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});