const {admin,db} = require("../config/admin");

module.exports = ( req, res, next)=>{
    let idToken;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer '))
    {
        console.log('Found "Authorization" header')
        idToken = req.headers.authorization.split('Bearer ')[1];        
    }
    else{
        console.error('no token')
        return res.status(403).json({error : 'Unauthorization'});
    }
    admin
    .auth()
    .verifyIdToken(idToken)
    .then(decodedToken=>{
        req.user = decodedToken;
        return db
        .collection('members')
        .where('userId','==',req.user.uid)
        .limit(1)
        .get();
    })
    .then(data=>{
        req.user.username = data.docs[0].data().username;
        req.user.imageurl = data.docs[0].data().imageurl;
        return next();
    })
    .catch(err=>{
        console.error('error while verifying token',err);
        return res.status(403).json(err);
    })
}