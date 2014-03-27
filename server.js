var http = require('http');
var url = require('url');
var path = require('path');
var fs = require('fs');
var io = require('socket.io');

var server = http.createServer(function(request, response){
	var pathname = url.parse(request.url).pathname;

	if(pathname == "/"){
		response.writeHead(200, {'Content-Type': 'text/plain'});
		response.end('Hello World!');
	} else if(pathname == "/chatroom"){
		response.writeHead(200, {'Content-Type': 'text/html'});
		response.end(fs.readFileSync(__dirname + '/client.html'));
	} else{
		response.writeHead(404, {'Content-Type': 'text/plain'});
		response.end('404 Not Found');
	}
});

server.listen(9999);

var io = io.listen(server);
io.set('log level', 1);
io.sockets.on('connection', function(socket){
	socket.on('message', function(msg) {
        console.log('Message Received: ', msg);
        socket.broadcast.emit('message', msg);
    });
});