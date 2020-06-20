const {db} = require("../config/admin");




exports.getcattle  = (req,res)=>{
    const cattledata = {
        name : req.body.name,
        detail : req.body.detail,
        userhandle : req.user.handle
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