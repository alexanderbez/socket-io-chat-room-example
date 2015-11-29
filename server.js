'use strict';
/* server.js */

const express = require('express');
const app     = express();
const server  = require('http').Server(app);
const io      = require('socket.io')(server);
const morgan  = require('morgan');
const api     = require('./api');

// Server port
let port = 3000;

// Express middleware
app.use(morgan('tiny'));

// Static assets
app.use(express.static('assets'));

// Router middleware
api.router.bootstrap(app);

// Socket middleware
api.socket.bootstrap(io);

// Start server
server.listen(port, () => {
  console.log(`Server listening on port ${port}...`);
});
