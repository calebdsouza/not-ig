// firebase-admin:
const fireAdmin = require('firebase-admin');
const fireConfig = require('../fireconfig.json')
fireAdmin.initializeApp({
  credential: fireAdmin.credential.applicationDefault(),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
});

module.exports = {
  auth: fireAdmin.auth(),
  storage: fireAdmin.storage(),
};