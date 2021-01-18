require('dotenv').config();
const mongoose = require('mongoose');

/* Connnect to our database */
// Get the URI of the local database, or the one specified on deployment.
const mongoURI = process.env.MONGODB_URI

mongoose
  .connect(mongoURI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useCreateIndex: true 
  })
  .catch((error) => {
    console.err('Error connecting to mongodb. Timeout reached.', error);
  });

module.exports = { mongoose }; // Export the active connection.
