const {db} = require("../config/admin");

// ผลิตภัณฑ์จากโค
exports.uploadproduct = (req,res) =>{
    const newProduct = {
        prdname : req.body.prdname,
        userhandle : req.user.username,
        prdtype : req.body.prdtype,
        prddate : req.body.prddate,
        expdate : req.body.expdate,
        prdamount : req.body.prddate,
        prdweight : req.body.prdweight,
        createAt: new Date().toISOString() 
    };
    db.collection('product')
    .add(newProduct)
    .then((doc)=>{
        const newPRD = newProduct;
        newPRD.productid = doc.id;
        res.json({message : `document ${doc.id} created success`});
    })
    .catch((err)=>{
        console.error(err);
        res.status(500).json({error : 'get wrong'});
    })
}

// แก้ไข้ข้อมูลสินค้า
exports.editproduct = (req,res)=>{
    let productdata = (req.body);
    db.doc(`/product/${req.params.productid}`)
    .update(productdata)
    .then(()=>{
        return res.json({message:'Finished'})
    })
    .catch(err=>{
        console.error(err);
        return res.status(500).json({error: err.code})
    })
}