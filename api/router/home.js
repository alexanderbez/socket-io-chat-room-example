'use strict';
/* api/router/home.js */

var router  = require('express').Router();
var appRoot = require('app-root-path');

/*
  Serve static file that will represent our chatroom.
*/
router.get('/', (req, res) => {
  res.sendFile(appRoot + '/index.html');
});

module.exports = router;
