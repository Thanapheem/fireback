const {db} = require("../config/admin");
const firebase = require('firebase');
const { database } = require("firebase-admin");
const { user } = require("firebase-functions/lib/providers/auth");

//ขายโคมีชีวิต
//แสดงข้อมูลสินค้าทั้หมด
exports.showcattle = (req,res)=> {
    db
        .collection('cattle')
        .get()
        .then((data)=>{
            let cattles =[];
            data.forEach((doc)=>{
                cattles.push({
                  
                    name : doc.data().name,
                    detail : doc.data().detail,
                    spicies : doc.data().spicies,
                    weight : doc.data().weight,
                    gender : doc.data().gender,
                    spicies : doc.data().spicies,
                    price : doc.data().price,
                    birthdate : doc.data().birthdate,
                    userhandle : doc.data().userhandle
                });
            }) ;
            return res.json(cattles);
        })
        .catch((err)=>{
            console.error(err);
            res.status(500).json({error: err.code});
        });
};

//แสดงข้อมูลสินค้า 1 ช้้น
exports.GetoneCattle =(req,res) =>{
    let cattledata = {};
    db.doc(`/cattle/${req.params.cowid}`)
    .get()
    .then((doc)=>{
        if(!doc.exists){
            return res.status(404).json({error : 'Not found Cattle'});
        }
        cattledata = doc.data();
        cattledata.cowid = doc.id
    })
    .then((data)=>{
        return res.json(cattledata)
    })
    .catch((err)=>{
        conslole.error(err);
        res.status(500).json({error:err.code});
    })
} 