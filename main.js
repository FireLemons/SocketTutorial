var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

app.get('/instructor', function(req, res){
	res.sendFile(__dirname + '/instructor.html');
});

io.on('connection', function(socket){
	console.log('a user connected');

	socket.on('answer', function(ans){
		console.log(ans);
		io.emit('answered', ans);
	});

	socket.on('disconnect', function(){
		console.log('user disconnected');
	});
});

http.listen(8009, function(){
	console.log('listening on *:8009');
});
