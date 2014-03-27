## Note

This chatroom consist of main two parts that are server side (server.js) and client side (client.html) .

*To understand what's going on below, you should:

1. Download the code and look server.js and client.html briefly. (If you could understand them, you should.)

2. Have background knowledge in JavaScript, jQuery, HTML, Node.js and SocketIO.

3. Know that my English skill is bad... (hahaha) However, Next time, It must be better!

## Broadcasting

broadcast sent message to all the clients

### client.html
```js
$('#submit').click(function(){
  socket.send($('#outgoing').val());
  $('#incoming').append('<li>' + $('#outgoing').val() + '</li>');
  $('#outgoing').val('');
});
```

The process is, when we click submit button, socket.send() sends the value in #outgoing and emits 'message' event. ( The event handler ( abbriviated to EH ) of 'message' event is in the server side. ) Then we set the #outgoing 's value to ''.

### server.js
```js
socket.on('message', function(msg){
  console.log('Message Recieved: ', msg);
  socket.broadcast.emit('message', msg);
});
```

When submit button is clicked, 'message' event is sent to the EH - socket.on('message', function(msg){}). msg is the sent value when the button is clicked. console.log() makes sure that the msg is sent to the EH.

socket.broadcast.emit('message', msg) is the main actor. It sends the message ( msg ) to all the clients that are connected, except to the one that sends the message. socket.broadcast.emit('message', msg) solves this problem. It emits 'message' event so 'message' EH in the client side can do something like sending message to the sender ( yeah! ).

### client.html (again)
```js
socket.on('message', function(message){
  $('#incoming').append($('<li></li>').text(message));
});
```

Lastly, when the 'message' event is sent, this 'message' EH sends the message to the sender. That's end of broadcasting!

