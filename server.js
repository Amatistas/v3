var express = require('express');
var bodyParser = require("body-parser");
var path = require('path');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
app.use(bodyParser.json());


app.use('/', express.static(path.join(__dirname, '/')));

app.get('/api/', function(req, res) {
	res.send('Welcome to api rest Nubefa');
});

app.get('/test/', function(req, res) {
	res.send(req.body);
});

const employeeRoutes = require('./src/routes/personal.route');
// using as middleware
app.use('/api/v1/employees', employeeRoutes);

io.on('connection', function(client) {
	client.on('disconnect', function() {
		console.log('disconnected');
	});
	client.on('room', function(data) {
		client.join(data.roomId);
		console.log(' Client joined the room and client id is ' + client.id);
	});
	client.on('toBackEnd', function(data) {
		client.in(data.roomId).emit('message', data);
	});
});

server.listen(7777);
console.log('server on port: 192.168.0.6:7777');

// Require employee routes

/* // listen for requests
app.listen(port, () => {
	console.log(`Server is listening on port ${port}`);
});
 */
