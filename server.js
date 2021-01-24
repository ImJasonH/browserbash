const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const spawn = require('child_process').spawn;
const sh = spawn('bash');
const port = process.env.PORT || 8080;

app.use(express.static(__dirname + '/public'));

sh.stdout.on('data', function(data) {
  io.emit('message', data);
});

sh.stderr.on('data', function(data) {
  io.emit('message', data);
});

sh.on('exit', function (code) {
  io.emit('exit', '** Shell exited: '+code+' **');

  http.close(() => {
    console.log('Process terminated')
  });
  process.exit();
});

io.on('connection', function(client){
  client.on('message', function(data){
    sh.stdin.write(data+"\n");
    io.emit('message', new Buffer("> "+data));
  });
});

http.listen(port, () => console.log('listening on port ' + port));

