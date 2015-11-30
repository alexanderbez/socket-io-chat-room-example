'use strict';
var socket = io();

/*
  Client state configs
*/
var _typing  = false;
var _timeout = undefined;
var _users   = [];

/*
  Auxiliary function to reset parameters when a user is no longer typing.
*/
function resetTyping() {
  _typing = false;
  socket.emit('user typing', false);
}

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

/*
  Message listener
*/
$("#msg").keypress((e) => {
  if (e.which !== 13) {
    if (_typing === false && $('#msg').is(':focus')) {
      _typing = true;
      socket.emit('user typing', true);
      _timeout = setTimeout(resetTyping, 3000);
    } else {
      clearTimeout(_timeout);
      _timeout = setTimeout(resetTyping, 3000);
    }
  }
});

/*
  Socket events
*/
socket.on('chat message', (msg) => {
  var msg = `[${msg.time}] - [${msg.nickname}]: ${msg.message}`;

  clearTimeout(_timeout);
  _timeout = setTimeout(resetTyping, 0);
  $('#messages').append($('<li>').text(msg));
});

socket.on('notify user', (user) => {
  $('#messages').append($('<li class="event">').text(`You have joined as ${user}`));
});

socket.on('user connected', (user) => {
  $('#messages').append($('<li class="event">').text(`${user} has joined.`));
});

socket.on('user disconnected', (user) => {
  $('#messages').append($('<li class="event">').text(`${user} has left.`));
});

socket.on('user typing', (msg) => {
  var i = _users.indexOf(msg.nickname);

  if (msg.isTyping) {
    if (i === -1) {
      _users.push(msg.nickname);
    }
  } else {
    if (i !== -1) {
      _users.splice(i, 1);
    }
  }

  switch(_users.length) {
    case 0:
      $('#typing-event').html('');
      break;
    case 1:
      $('#typing-event').html(`${_users[0]} is typing...`);
      break;
    case 2:
      $('#typing-event').html(`${_users[0]} and ${_users[1]} are typing...`);
      break;
    default:
      $('#typing-event').html('Multiple users are typing...');
      break;
  }
});
