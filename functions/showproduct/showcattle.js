const {db} = require("../config/admin");
const firebase = require('firebase');
const { database } = require("firebase-admin");
const { user } = require("firebase-functions/lib/providers/auth");
exports.showcattle = (req,res)=> {
    db
        .collection('cattles')
        .get()
        .then((data)=>{
            let cattles =[];
            data.forEach((doc)=>{
                cattles.push({
                  
                    name : doc.data().name,
                    detail : doc.data().detail,
                    userhandle : doc.data().userhandle
                });
            }) ;
            return res.json(cattles);
        })
        .catch((err)=>{
            console.error(err);
            res.status(500).json({error: err.code});
        });

    


}