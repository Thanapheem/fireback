const {db} = require("../config/admin");

//สินค้าเบ็ดเตล็ด
//แสดงทั้งหมด
exports.showAcc =(req,res)=>{
    db.
    collection('accessories')
    .get()
    .then((data)=>{
        let accessories=[];
        data.forEach((doc)=>{
            accessories.push({
                aName : req.body.aName, 
                userhandle : doc.data().username,
                acctype : doc.data().acctype,
                adate : doc.data().adate,
                detail : doc.data().detail,
                amount : doc.data().amount,
                Weight : doc.data().Weight
            });
        });
        return res.json(accessories);
    })
    .catch((err)=>{
        console.error(err);
        res.status(500).json({error: err.code});
    });
}

//แสดง 1 อย่าง
exports.showOneAcc = (req,res)=>{
    let Accdata ={};
    db.doc(`/accessories/${req.params.ACCid}`)
    .get()
    .then((doc)=>{
        if(!doc.exists){
            return res.status(404).json({error:'Not Found Accessories'});
        }
        Accdata = doc.data();
        Accdata.ACCid =doc.id;
    })
    .then((data)=>{
        return res.json(Accdata)
    })
    .catch((err)=>{
        conslole.error(err);
        res.status(500).json({error:err.code});
    })
}