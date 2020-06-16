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


/*app.get('/User',(req,res)=>{
    admin
    .firestore()
    .collection('User')
    .orderBy('name')
    .get()
    .then(data => {
        let User = [];
        data.forEach(doc=>{
            User.push({
                Userid : doc.id,
                name : doc.data().name,
                username : doc.data().username,
                password : doc.data().password
            });
        });
        return res.json(User);
    })
    .catch(err=> console.log(err));
})*/
    const db = admin.firestore();
  app.post('/signup',(req,res)=>{
     const newUser = {
         email : req.body.email,
         password :req.body.password,
         confirmpassword : req.body.confirmpassword,
        handle  : req.body.handle
       
     };
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
 exports.api = functions.region('asia-east2').https.onRequest(app);
