const {db} = require("../config/admin");




exports.getcattle  = (req,res)=>{
    const cattledata = {
        name : req.body.name,
        detail : req.body.detail,
        type : req.body.type,
        userhandle : req.user.handle,
        cattleid : req.body.cattleid,
        weight : req.body.weight,
        gender : req.body.gender,
        spicies : req.body.spicies,
        price : req.body.price,
        birthdate : req.body.birthdate,
        dadname : req.body.dadname,
        momname : req.body.momname,

        
    };
    
    
    db.collection('cattles')
    .add(cattledata)
    .then((doc)=>{
        res.json({message : `document ${doc.id} created success`});
    })
    .catch((err)=>{
        res.status(500).json({error : 'get wrong'});
    })

}