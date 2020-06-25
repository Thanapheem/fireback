const {db} = require("../config/admin");


exports.uploadproduct = (req,res) =>{
    const newProduct = {
        prdname : req.body.prdname,
        userhandle : req.user.handle,
        prdtype : req.body.prdtype,
        prddate : req.body.prddate,
        expdate : req.body.expdate,
        prdamount : req.body.prddate,
        prdweight : req.body.prdweight
        
       

      
    };
    db.collection('product')
    .add(newProduct)
    .then((doc)=>{
        res.json({message : `document ${doc.id} created success`});
    })
    .catch((err)=>{
        res.status(500).json({error : 'get wrong'});
    })
}