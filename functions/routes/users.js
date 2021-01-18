'use strict';
const { mongoose } = require('../db/mongoose');
mongoose.set('bufferCommands', false);

const { User } = require('../models/User');
const { mongoChecker } = require('../db/utils');
const { validateToken } = require('../firebase/authenticate');
const { requestErrorHandler } = require('./utils');
const express = require('express');
const router = express.Router();
const log = console.log;
const err = console.err;

/**
 * Signup user
 */
router.post('/signup', mongoChecker, validateToken, async (req, res) => {
  const user = req['currentUser'];
  
  try {
    const newUser = new User({ uid: user.uid });
    const result = await newUser.save();
    console.log(result);
    res.status(200).send({ status: 'added' });
  } catch (error) {
    requestErrorHandler(req, res, 
      'Internal server error adding new user:\n',
      'Bad request adding new user:\n');
  }
});

module.exports = router;