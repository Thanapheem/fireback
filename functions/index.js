const functions = require('firebase-functions');
const admin = require('firebase-admin');
const app = require('express')();
const serviceAccount = require("./cattle-5e795-3496bd6ce619.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://cattle-5e795.firebaseio.com"
  });

const config = {
    apiKey: "AIzaSyCEcTnnPl-Rk60aovpZ3RsNYJTCMqCWBMM",
    authDomain: "cattle-5e795.firebaseapp.com",
    databaseURL: "https://cattle-5e795.firebaseio.com",
    projectId: "cattle-5e795",
    storageBucket: "cattle-5e795.appspot.com",
    messagingSenderId: "910303977917",
    appId: "1:910303977917:web:0ece44c0ed0f50b0a3f2d4",
    measurementId: "G-3QS9SD3Z06"
  };
const firebase = require('firebase');
firebase.initializeApp(config);

  const isEmail = (email) => {
    const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email.match(regEx)) return true;
    else return false ;
  }
  const isEmpty=(string)=>{
      if(string.trim()==='') return true;
      else return false;
  }
    const db = admin.firestore();
  app.post('/signup',(req,res)=>{
     const newUser = {
         email : req.body.email,
         password :req.body.password,
         confirmpassword : req.body.confirmpassword,
        handle  : req.body.handle
       
     };

        let errors = {};
        if(isEmpty(newUser.email)){
            errors.email = "Email is empty";
        }else if (!isEmail(newUser.email)){
            errors.email = 'type right email pls'
        }
        if(isEmpty(newUser.password)) errors.password = "must enter password"
        if(newUser.password !== newUser.confirmpassword) errors.confirmpassword = 'password not match';
        if(isEmpty(newUser.handle)) errors.handle = 'Must Enter';
        if(Object.keys(errors).length>0) return res.status(400).json(errors);
        //เช็คข้อมูล
    let token,userId;
     db.doc(`/members/${newUser.handle}`).get()
        .then(doc=>{
            if (doc.exists){
                return res.status(400).json({handle : 'hd taken'});
            }else {
                return firebase 
                .auth().createUserWithEmailAndPassword(newUser.email,newUser.password)
            }
       })
        .then(data => {
            userId = data.user.uid;
            return data.user.getIdToken();

        })  
        .then(idToken =>{
            token = idToken ;
            const userCredentials = {
                handle: newUser.handle,
                email : newUser.email,
                createAt: new Date().toISOString(),
                userId

            };
            db.doc(`/members/${newUser.handle}`).set(userCredentials);

        }) 
        .then(()=>{
            return res.status(201).json({token});
        })
        .catch(err=>{
            if (err.code === 'auth/email-already-in-use'){
                return res.status(400).json ({email: 'email has used'})
            }
            console.error(err);
            return res.status(500).json({error : 'boom'});
        })     
    });

    app.post('/login',(req,res)=>{
        const user = {
            email : req.body.email,
            password : req.body.password
        };
        let errors = {};
        if(isEmpty(user.email))errors.email = 'must not empty';
        if(isEmpty(user.password)) errors.password = "Enter pass";
        if(Object.keys(errors).length > 0) return res.status(400).json(errors);

        firebase
        .auth()
        .signInWithEmailAndPassword(user.email,user.password)
        .then(data=>{
            return data.user.getIdToken();
        })
        .then(token=>{
            return res.json({token});
        })
        .catch((err)=>{
            if(err.code === 'auth/wrong-password'){
                return res.status(403).json({general : 'wrong data,try again'});
            }else return res.status(500).json({error: err.code});
            return res.status(500).json({error: err.code});
        })
    


    })
 exports.api = functions.region('asia-east2').https.onRequest(app);
