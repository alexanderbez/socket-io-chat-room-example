var socket = io();

var _typing  = false;
var _timeout = undefined;
/*
  Message submission
*/
$('form').submit(() => {
  socket.emit('chat message', {
    message: $('#msg').val()
  });
  $('#msg').val('');

  return false;
});

function timeoutFunction () {  
  _typing = false;
  socket.emit('user typing', _typing);
}

$("#msg").keypress((e) => {
  if (e.which !== 13) {
    if (_typing === false && $('#msg').is(':focus')) {
      _typing = true;
     
      socket.emit('user typing', _typing);
    } else {
      clearTimeout(_timeout);
     
      _timeout = setTimeout(timeoutFunction, 3000);
    }
  }
});

/*
  Socket events
*/
socket.on('chat message', (params) => {
  var msg = `[${params.time}] - [${params.nickname}]: ${params.message}`;

  $('#messages').append($('<li>').text(msg));
});

socket.on('user connected', (msg) => {
  $('#messages').append($('<li class="event">').text(`${msg} has joined.`));
});

socket.on('user disconnected', (msg) => {
  $('#messages').append($('<li class="event">').text(`${msg} has left.`));
});

socket.on('user typing', (user) => {
  if (user) {
    $('#typing-event').html(`${user} is typing...`);
  } else {
    $('#typing-event').html('');
  }
});
