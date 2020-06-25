const functions = require('firebase-functions');
const { signup, login, uploadimage, getuserdetail, getauthuserdetail } = require('./members/user');
const { auth } = require('firebase-admin');
const app = require('express')();
const Auth = require('./config/Auth');
const { getcattle} = require('./upload/getcattel');
const { showcattle } = require('./showproduct/showcattle');
const { uploadproduct } = require('./upload/uploadprd');
const { uploadacc } = require('./upload/uploadaccessories');
  


        //get
        app.get('/user',Auth,getauthuserdetail);
        app.get('/userdetail',getuserdetail);
        app.get('/cattles',showcattle);
        //post
        // user
        app.post('/signup',signup,);
        app.post('/login',login);
        app.post('/user/img',Auth,uploadimage);
        //product
        app.post('/cattle',Auth,getcattle);
        app.post('/uploadproduct',Auth,uploadproduct);
        app.post('/uploadaccessories',Auth,uploadacc);

 exports.api = functions.region('asia-east2').https.onRequest(app);
