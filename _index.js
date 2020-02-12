//подключаю express
const express = require("express");
const app = express();

//подключаю socket.io
const socketIO = require('socket.io');
const PORT = process.env.PORT || 80;
const io = socketIO.listen(app.listen(PORT));

let nameClient = {}; //объект с именами всех участников чата

//Файлы для представлений находятся в папке 'tpl'
app.set("views", 'tpl'); 
//подключаю шаблонизатор pug
app.set("view engine", "pug");
//в качестве статической папки
app.use(express.static(__dirname + "/public")); 

//настраиваю обработчик событий методом 'get', который обрабатывает обращение к корню сервера
app.get('/', function(req, res){
  //когда клиент в корне хоста, управление передается шаблонизатору (pug)
  res.render('page');
});

//событие по обновлению страницы 
io.sockets.on('connection', function(client){
  console.log('Connected');

  // обработка нового приветствия
  client.on('hello', function(data){ 
    nameClient[client.id] = data.name;
    // отправка сообщения
    io.sockets.emit("message", {"message": "Добро пожаловать в чат, " + nameClient[client.id]});
  });

  // обработка отправленного сообщения
  client.on('send', function(data){ 
    console.log(data.message);
    // отправка сообщения
    io.sockets.emit("message", {"message": nameClient[client.id] + ": " + data.message}); 
  });
  
});