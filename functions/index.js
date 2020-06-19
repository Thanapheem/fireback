const functions = require('firebase-functions');
const { signup, login, uploadimage } = require('./members/user');
const app = require('express')();

  
  app.post('/signup',signup,);
  app.post('/login',login);

 exports.api = functions.region('asia-east2').https.onRequest(app);
