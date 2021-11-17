var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
const camera = require('./src/camera');
const uploadToS3 = require('./src/uploadToS3');

var sensor = require("node-dht-sensor");
const path = require('path');
const { readFile } = require('fs');
const fs = require('fs');
const cors = require('cors');


app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/js', express.static
  (path.join(__dirname, '/node_modules/socket.io-client/dist')));

//home page
app.get('/', (req, res) => {
  res.sendFile('index.html');
});

//endpoint to take a pic - created to test upload to s3
app.get('/image', (req,res) =>{
  var timestamp = new Date().getTime();
  camera.config.output = `${__dirname}/public/${timestamp}.jpg`;
  
  camera
    .snap()
    .then((result) => {
      uploadToS3.uploadFile(`${__dirname}/public/${timestamp}.jpg`,'paul-s3-training');
      res.json({'image': `${camera.config.output}`});
    })
    .catch(err => {
      console.log(err);
    });
});

io.on('connection', (socket) => {
    //CAMERA
    socket.on('takePic', ()=> {
      takePic();
    });
});

// setInterval(() => {
//   takePic();
// },30000);

//CAMERA
function takePic(value) {
  
  var timestamp = new Date().getTime();
  camera.config.output = `${__dirname}/public/${timestamp}.jpg`;
  camera
    .snap()
    .then((result) => {
      //let front end know it needs to update
      io.sockets.emit('updatePic',`./${timestamp}.jpg`); 
    })
    .catch(err => {
      console.log(err);
    });
}


// function update(){
//   return {
//     led:pins.led.readSync(),
//     lamp:pins.lamp.readSync()
//   }
// }

http.listen(3000, () => {
  console.log('listening on port 3000');
});


// //student in past class wanted to know how to read all images
// //and pass to front end - index.html. she showed all images taken
// //not just current
// function readFolder() {

//   const currentDirectory = path.join(__dirname, 'public');
//   let snapShotArray = [];

//   fs.readdir(currentDirectory, (err, files) => {
//     if (err)
//       console.log(err);
//     else {
//       files.map(file => {
//         snapShotArray.push(file);
//       })
//       io.sockets.emit('folderRead',snapShotArray);
//     }
//   })
// };