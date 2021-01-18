//Routes
'use strict';
const images = require('./images');
const users = require('./users');

/**
 * Add routes to given express app object
 * @param {object} app - api express app
 */
const initRoutes = (app) => {
  
  app.use('/images/v1', images);
  app.use('/users/v1', users)
};

module.exports = {
  initRoutes,
};