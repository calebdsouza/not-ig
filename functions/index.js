const functions = require('firebase-functions');
const { app } = require('./server');

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

let firebasePathPatch = app => (req, res) => {
  
  return app(req, res);
}

exports.not_ig = functions.https.onRequest(app);
