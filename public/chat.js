//let form;
let client;
let input;
let content;
let send;

window.onload = function(){
  client = io.connect("http://localhost:8080");

  //form = document.getElementById("form"); // не использую пока
  input = document.getElementById("field"); // inpun поле ввода ссобщения 
  content = document.getElementById("content"); // div
  send = document.getElementById("send"); // button 

  let messages = []; // массив для записи в div
  
  //узнаем имя нового участника
  let name = prompt('Как вас зовут?', 'Имя');
  if(name) { 
    // отпраляем на сервер
    client.emit('hello', {'name': name}); 
  }  

  //Обработка сообщения
  client.on('message', function(data){
    //console.log(data);    
    messages.push(data.message);
    // обнуляем содержимое div каждый раз
    content.innerHTML = '';
    // формируем содержимое div
    messages.forEach(function(item){
      //послать через цикл в div
      content.innerHTML += item + "<br>"; 
    });
  });

//выбрать введённые пользователем данные из текстового поля
//послать выбранные данные на сервер в сообщении под именем 'send' 
  send.onclick = function(){
    //console.log("here");
    // содержимое input в строковую переменную 
    let value = input.value;
    // отправка сообщения на сервер
    client.emit('send', {'message': value});
    return false; // проверка
  }
};