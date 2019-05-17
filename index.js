var app = require('express')();
var http = require('http').Server(app);
var fs = require('fs');
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

app.get('/', function(req, res){
  var source = fs.readFileSync(__dirname + "/lib/html/index.html", "utf8");
  res.send(source);
});

app.get('/in', function(req, res){
  var source = fs.readFileSync(__dirname + "/lib/html/input.html", "utf8");
  res.send(source);
});

app.get('/out', (req, res) => {
  var source = fs.readFileSync(__dirname + "/lib/html/output.html", "utf8");
  res.send(source);
});

app.get('/style', (req, res) => {
  res.sendFile(__dirname + '/lib/css/style.css');
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    console.log(msg);
      fs.appendFile(__dirname + "/log.txt", msg+'\n', 'utf8', function(err) {
        if(err) {
            return console.log(err);
        }
    });
    io.emit('chat message', msg);
  });
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
