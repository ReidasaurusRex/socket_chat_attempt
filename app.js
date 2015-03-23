// Requirements
var express = require('express'),
    app = express(),
    http = require('http').Server(app),
    io = require('socket.io')(http),
    redis = require('redis'),
    client = redis.createClient(),
    methodOverride = require('method-override'),
    bodyParser = require('body-parser');

// Middleware
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));

// Static Files
app.use(express.static(__dirname + '/public'));

// Setting current user
var currentUser = null; 

// Index
app.get('/', function(req, res) {
  
    res.sendFile(__dirname + "/views/index.html");
  });


io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
    console.log('message: ' + msg);
  });
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

// 

// // User handling

// app.route('/user')
//   .post(function(req, res) {  // Log in
//     currentUser = req.body.user;
//     res.redirect('/');
//   })
//   .delete(function(req, res) {  // Log out
//     client.del(currentUser);
//     currentUser = null;
//     res.redirect('/');
//   });