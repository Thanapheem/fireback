const functions = require('firebase-functions');
const { signup, login, uploadimage, getuserdetail, getauthuserdetail } = require('./members/user');
const { auth } = require('firebase-admin');
const app = require('express')();
const Auth = require('./config/Auth');
const { getcattle } = require('./cattle/getcattel');
const { showcattle } = require('./showproduct/showcattle');
  
  app.get('/user',Auth,getauthuserdetail);
  app.get('/userdetail',getuserdetail);
  app.get('/cattles',showcattle);
  app.post('/signup',signup,);
  app.post('/login',login);
  app.post('/user/img',Auth,uploadimage);
  app.post('/cattle',Auth,getcattle);
 exports.api = functions.region('asia-east2').https.onRequest(app);
