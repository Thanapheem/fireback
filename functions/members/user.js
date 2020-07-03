const {admin , db} = require("../config/admin");
const config = require("../config/conf");
const {valdsignup,valdlogin} = require("../config/validate");
const firebase = require('firebase');
const { generateKeyPair } = require("crypto");
const {uuid} = require('uuidv4');
const { user } = require("firebase-functions/lib/providers/auth");


firebase.initializeApp(config);


// Signup = สมัครสมาชิก
    exports.signup =     (req,res)=>{
        const newUser = {
            
            username : req.body.username,
            password :req.body.password,
            confirmpassword : req.body.confirmpassword,
            email : req.body.email,
            name : req.body.name,
            lastname : req.body.lastname,
            gender : req.body.gender,
            idno : req.body.idno,
            phone : req.body.phone,
            address : req.body.address,
            birthdate : req.body.birthdate

            
        };
        // เช็คการกรอกข้อมูล
        const {valid,errors} = valdsignup(newUser);
        if (!valid) return res.status(400).json(erros);
        let token,userId;
        
        //ใส่รูปโปรไฟล์เปล่า ๆ 
        const noimg = 'pf.png';
        
        db.doc(`/members/${newUser.username}`).get()
            .then(doc=>{
                if (doc.exists){
                    return res.status(400).json({username : 'hd taken'});
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
                    username: newUser.username,
                    email : newUser.email,
                    name : newUser.name,
                    lastname : newUser.lastname,
                    gender :newUser.gender,
                    idno : newUser.idno,
                    phone : newUser.phone,
                    address : newUser.address,
                    birthdate : newUser.birthdate,
                    createAt: new Date().toISOString(),
                    imageurl : `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${noimg}?alt=media` ,
                    userId

                };
                db.doc(`/members/${newUser.username}`).set(userCredentials);

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
        };

    // Login = ลงชื่อเข้าใช้
        exports.login = (req,res)=>{
            const user = {
                email : req.body.email,
                password : req.body.password
            };
            const {valid,errors} = valdlogin(user);
            if (!valid) return res.status(400).json(erros);
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
        };



    // อัพรุูปโปรไฟล์ *
    exports.uploadimage = (req,res) =>{
        const Busboy = require('busboy');
        const path = require('path');
        const os = require('os');
        const fs = require('fs');
        const busboy = new Busboy({headers : req.headers});

        let imagename;
        let imageUpload = {};
        let generatedToken = uuid();

        busboy.on('file',(fieldname,file,filename,endcoding,mimetype)=>{
           console.log(fieldname);
           console.log(filename);
           console.log(mimetype);;
                  
            const imageExten = filename.split('.')[filename.split('.').length - 1];
            imagename  = `${Math.round(Math.random()*100000000000)}.${imageExten}`;
            const filepath = path.join(os.tmpdir(),imagename);
            imageUpload = {filepath,mimetype};
            file.pipe(fs.createWriteStream(filepath));
           
        });
        busboy.on('finish',()=>{
           
            admin
            .storage()
            .bucket(config.storageBucket)
            .upload(imageUpload.filepath,{
                resumable : false,
                metadata : {
                    metadata : {
                        contentType : imageUpload.mimetype,
                        firebaseStorageDownloadTokens : generatedToken
                    }
                }
            })
            .then(()=>{
                const imageurl = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${imagename}?alt=media&token=${generatedToken}`
                return db.doc(`/members/${req.user.username}`).update({imageurl});
            })
            .then(()=>{
                return res.json ({message : ' upload success'});

            })
            .catch(err =>{
                console.error(err);
                return res.status(500).json({error : err.code});
            });

        });
       busboy.end(req.rawBody);

    };

//แสดงข้อมูลผู่้ใช้ (น่าจะผิด)
exports.getuserdetail = (req,res) =>{
    let userData = {};
    db.doc(`/members/${req.params.username}`)
    .get()
    .then((doc)=>{
        if (doc.exists){
            userData.user = doc.data();
            return db
                .collection('cattles')
                .where("userusername","==",req.params.username)
                .orderBy("username","desc")
                .get();
        }else{
            return res.status(404).json({error : " user not found"})
        }
    })
   
    .catch((err)=>{
        console.error(err);
        return res.status(500).json({error : err.code});
    })
}
//ใช้ไม่ได้
exports.getauthuserdetail = (req,res)=> {
    let userData = {};
    db.doc(`/members/${req.user.username}`)
    .get()
    .then((doc)=>{
        if (doc.exists){
            userData.credentails = doc.data();
            return db
                .collection('likes')
                .where("userusername","==",req.user.username)
                .get();
        }
    }).then(data=>{
        userData.likes = [];
        data.forEach(doc=>{
            userData.likes.push(doc.data());
        });
        return res.json(userData);
    })
    .catch((err)=>{
        console.error(err);
        return res.status(500).json({error : err.code });
    })


}