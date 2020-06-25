const {db} = require("../config/admin");

exports.uploadacc = (req,res) =>{
    const newAcc ={
        aName : req.body.aName, 
        userhandle : req.user.handle,
        acctype : req.body.acctype,
        adate : req.body.adate,
        detail : req.body.detail,
        amount : req.body.amount,
        Weight : req.body.Weight
        
    }
    db.collection("accessories")
    .add(newAcc)
    .then((doc)=>{
        res.json({message : `document ${doc.id} created success`});
    })
    .catch((err)=>{
        res.status(500).json({error : 'get wrong'});
    })

}
