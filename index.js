/*
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 8080
const mongoose = require('mongoose')
const teste = require('./routes/teste.route')

// mongoose.connect('mongodb://batman:R435612l@ds125021.mlab.com:25021/db_mongo_teste', { useNewUrlParser: true })

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

// var db = mongoose.connection
// db.on('error', console.error.bind(console, 'connection error:'))
// db.once('open', function () {
//   console.log('BD on')
// })

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

//Libera requisições CORS

const http = require('http').Server(app)
const io = require('socket.io')(http)

app.listen(port, () => {
  console.log('listening: ' + port)
})

app.use('/teste', teste)

io.on('connection', (socket) => {

  socket.on('disconnect', function () {
    io.emit('users-changed', { user: socket.nickname, event: 'left' });
  });

  socket.on('set-nickname', (nickname) => {
    socket.nickname = nickname;
    io.emit('users-changed', { user: nickname, event: 'joined' });
  });

  socket.on('add-message', (message) => {
    io.emit('message', { text: message.text, from: socket.nickname, created: new Date() });
  });
});

*/

// let express = require('express');
// let app = express();
// let http = require('http').Server(app);
// let io = require('socket.io')(http);

// io.on('connection', (socket) => {
//   socket.join('sala');
//   socket.on('disconnect', function () {
//     console.log('disconnect')
//     io.emit('users-changed', { user: socket.nickname, event: 'left' });
//   });

//   socket.on('set-nickname', (nickname) => {
//     console.log('Nickname ', nickname)
//     socket.nickname = 'Teste';
//     io.emit('users-changed', { user: nickname, event: 'joined' });
//   });

//   socket.on('add-message', (message) => {
//     console.log('add-message ', message)
//     io.emit('message', { text: message.text, from: socket.nickname, created: new Date() });
//   });
// });

// var port = process.env.PORT || 8080;

// http.listen(port, function () {
//   console.log('listening in http://localhost:' + port);
// });

// var app = require('express')();
// var http = require('http').Server(app);
// var io = require('socket.io')(http);

// var clients = {};

// app.get('/', function(req, res){
//   res.send('server is running');
// });

// io.on("connection", function (client) {
//     client.on("join", function(name){
//     console.log("Joined: " + name);
//       clients[client.id] = name;
//       client.emit("update", "You have connected to the server.");
//       client.broadcast.emit("update", name + " has joined the server.")
//     });

//     client.on("send", function(msg){
//     console.log("Message: " + msg);
//       client.broadcast.emit("chat", clients[client.id], msg);
//     });

//     client.on("disconnect", function(){
//     console.log("Disconnect");
//       io.emit("update", clients[client.id] + " has left the server.");
//       delete clients[client.id];
//     });
// });

// http.listen(8080, function(){
//   console.log('listening on port 8080');
// });

// var socket = require('socket.io'),
//     http = require('http'),
//     servidor = http.createServer(),
//     socket = socket.listen(servidor);

// socket.on('connection', function(connection) {
//     console.log('Usuario conectado.');

//     connection.on('mensagem', function(msg){

//       console.log(msg)
//       socket.emit('mensagem', msg);

//     });

// });

// servidor.listen(8080, function(){
//     console.log('Servidor iniciado e rodando 8080...');
// });

var app = require('express')() // instancia do express
var http = require('http').Server(app)
var io = require('socket.io')(http) // instancia do socket
// aqui coloco o path chat pois vai ser o direcionamento do nginx que irei configurar posteriomente

app.get('/chat', function (req, res) {
  // direcionar para index.html
  iniciaChat()
  res.end()
})

// iniciaChat()

http.listen(8080, function () {
  console.log('listening on *:8080')
})

function iniciaChat () {
  io.on('connection', function (socket) { // estabelece a conexão
    // metodo create que registra a sala
    socket.on('create', function (room) { // recebe o id da sala
      socket.join(room) // entra na sala que foi passada
      console.log('Create', room)
    })
    // metodo chat messagem
    // envia a mensagem, passa o id da sala e a mensagem
    socket.on('chat message', function (id, msg) {
      console.log('chat', id, msg)
      // envia a mensagem para a sala <id>
      io.to(id).emit('chat message', { remetente: 'Eu', hora: Date.now(), mensagem: msg, tipo: 'texto' })
    })
  })
  // coloca a porta que o serviço será executado
}

let buscar = [15000, 20000, 95000, 80000]
let arrayCompleto = []

console.time('Begin')
for (let index = 0; index < 100000; index++) arrayCompleto.push(index)
console.timeEnd('Begin')

console.time('Filtro1')
let filtro1 = arrayCompleto.filter(item => {
  return buscar.includes(item)
})

console.log(filtro1)
console.timeEnd('Filtro1')

console.time('Filtro2')
let filtro2 = buscar.filter(item => {
  return arrayCompleto.includes(item)
})
console.log(filtro2)
console.timeEnd('Filtro2')

function filtro (item) {
  return new Promise((resolve) => {
    if (arrayCompleto.includes(item)) {
      resolve(item)
    }
    resolve()
  })
}

let promises = []
let tamanho = buscar.length

console.time('Filtro3')

for (let index = 0; index < tamanho; index++) {
  promises.push(filtro(buscar[index]))
}
console.timeEnd('Filtro3')

Promise.all(promises)
  .then((result) => {
    console.log(result)
  })
