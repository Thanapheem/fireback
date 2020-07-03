const {db} = require("../config/admin");

exports.uploadacc = (req,res) =>{
    const newAcc ={
        aName : req.body.aName, 
        userhandle : req.user.username,
        acctype : req.body.acctype,
        adate : req.body.adate,
        detail : req.body.detail,
        amount : req.body.amount,
        Weight : req.body.Weight
        
    }
    db.collection("accessories")
    .add(newAcc)
    .then((doc)=>{
        const newaCCs = newAcc;
        newaCCs.ACCid = doc.id;
        res.json({message : `document ${doc.id} created success`});
    })
    .catch((err)=>{
        res.status(500).json({error : 'get wrong'});
    })
}

//แก้ไขข้อมูล
exports.editAccss = (req,res) =>{
    let Accdata =(req.body);
    db.doc(`accessories/${req.params.ACCid}`)
    .update(Accdata)
    .then(()=>{
        return res.json({message:'Finished'})
    })
    .catch(err=>{
        console.error(err);
        return res.status(500).json({error: err.code})
    })
}
