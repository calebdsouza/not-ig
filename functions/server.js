'use strict';
require('dotenv').config();
const path = require('path');
const express = require('express');
const app = express();
const log = console.log;
log('Express server');

// cors
const cors = require('cors');
const corsOptions = { origin: true }
app.use(cors(corsOptions));

// body-parser: middleware for parsing HTTP JSON body into a usable object
const bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Fire authentication
const { verifyIDToken } = require('./firebase/authenticate');
app.use(verifyIDToken);

// initlaize api routes
const RoutesUtil = require('./routes/index');
RoutesUtil.initRoutes(app);

// Serve the build
app.use(express.static(path.join(__dirname, 'public')));

// All routes other than above will go to index.html
app.get('*', (req, res) => {

  console.log(path.normalize(path.join(__dirname, 'public/index.html')));
  res.sendFile(path.normalize(path.join(__dirname, 'public/index.html')));
});

// const port = 5005;
// app.listen(port, () => {
//   log(`Listening on port ${port}...`);
// });


module.exports = {
  app,
};