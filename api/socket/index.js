'use strict';
/* api/socket/indjex.js */

const Moniker = require('moniker');
const nameGen = Moniker.generator([Moniker.adjective, Moniker.noun]);

const _users = new Map();

/*
  Pickes a random user nickname based off of a socket ID. If such nickname
  already exists, then a numeric suffix will be added.
*/
let getUser = (id) => {
  let nickname = _users.get(id);

  // If this ID has not been encountered before
  if (!nickname) {
    nickname  = nameGen.choose();
    let count = 0;

    // Prevent collisions by appending a numeric suffix
    for (let name of _users.values()) {
      if (name === nickname) {
        count += 1;
      }
    }

    if (count !== 0) {
      nickname += ` (${count})`;
    }

    // Store the ID nickname pair in the map
    _users.set(id, nickname);
  }

  return nickname;
};

/*
  Configure socket.io events.
*/
let bootstrap = (io) => {
  // connection event
  io.on('connection', (socket) => {
    socket.username = getUser(socket.id);

    socket.emit('notify user', socket.username);
    socket.broadcast.emit('user connected', socket.username);

    // disconnect event
    socket.on('disconnect', () => {
      socket.broadcast.emit('user disconnected', socket.username);
    });

    // chat message event
    socket.on('chat message', (params) => {
      let timestamp = (new Date()).toISOString();

      io.emit('chat message', {
        nickname: socket.username,
        message: params.message,
        time: timestamp
      });
    });

    // user typing event
    socket.on('user typing', (isTyping) => {
      if (isTyping === true) {
        socket.broadcast.emit('user typing', {
          nickname: socket.username,
          isTyping: true
        });
      } else {
        socket.broadcast.emit('user typing', {
          nickname: socket.username,
          isTyping: false
        });
      }
    });
  });
};

module.exports = {
  bootstrap: bootstrap
};
