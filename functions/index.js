const functions = require('firebase-functions');
const { signup, login, uploadimage, getuserdetail, getauthuserdetail } = require('./members/user');
const { auth } = require('firebase-admin');
const app = require('express')();
const Auth = require('./config/Auth');
const { getcattle, editCattle} = require('./upload/getcattel');
const { showcattle, GetoneCattle } = require('./showproduct/showcattle');
const { uploadproduct, editproduct } = require('./upload/uploadprd');
const { uploadacc, editAccss } = require('./upload/uploadaccessories');
const { getoneProduct, showallproduct } = require('./showproduct/showproduct');
const { showAcc, showOneAcc } = require('./showproduct/showAcc');
  
        // เกี่ยวกับผู้ใช้
        app.post('/signup',signup,);
        app.post('/login',login);
        app.post('/user/img',Auth,uploadimage);
        app.get('/userdetail',getuserdetail);
        app.get('/user',Auth,getauthuserdetail);
        
        //แสดงสินค้าทั้งหมด   
        app.get('/cattles',showcattle);
        app.get('/product',showallproduct);
        app.get('/accessories',showAcc);
        
        //แสดงสินค้า 1 ชิ้น
        app.get('/getcow/:cowid',Auth,GetoneCattle)
        app.get('/getprd/:productid',Auth,getoneProduct);
        app.get('/getacces/:ACCid',Auth,showOneAcc);
        
        //อัพโหลดสินค้า
        app.post('/cattle',Auth,getcattle);
        app.post('/uploadproduct',Auth,uploadproduct);
        app.post('/uploadaccessories',Auth,uploadacc);

        //แก้ไขข้อมูลสินค้า
        app.post('/updatecattle/:cowid',Auth,editCattle);
        app.post('/updateprduct/:productid',Auth,editproduct);
        app.post('/updateacc/:ACCid',Auth,editAccss);

 exports.api = functions.region('asia-east2').https.onRequest(app);
