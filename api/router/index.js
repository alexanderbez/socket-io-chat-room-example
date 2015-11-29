'use strict';
/* api/router/index.js */

/*
  Bootstrap routes on main express app.
*/
let bootstrap = (app) => {
  app.use('/', require('./home'));
};

module.exports = {
  bootstrap: bootstrap
};
