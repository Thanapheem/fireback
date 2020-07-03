const {db} = require("../config/admin");

//ผลิตภัณฑ์
// แสดงสินค้าทั้งหมด
exports.showallproduct = (req,res)=>{
    db
    .collection('product')
    .get()
    .then((data)=>{
        let product = [];
        data.forEach((doc)=>{
            product.push({
                prdname : doc.data().prdname,
                userhandle : doc.data().userhandle,
                prdtype : doc.data().prdtype,
                prddate : doc.data().prddate,
                expdate : doc.data().expdate,
                prdamount : doc.data().prdamount,
                prdweight : doc.data().prdweight
            });
        });
        return res.json(product);
    })
    .catch(err=>{
        console.error(err);
        res.status(500).json({error:err.code});
    })
}

// แสงสินค้า 1 อย่าง
exports.getoneProduct=(req,res)=>{
    let productdata = {};
    db.doc(`/product/${req.params.productid}`)
    .get()
    .then((doc)=>{
        if(!doc.exists){
            return res.status(404).json({ error : 'Not found product'});
        }
        productdata = doc.data();
        productdata.productid = doc.id
    })
    .then((data)=>{
        return res.json(productdata)
    })
    .catch((err)=>{
        console.error(err);
        res.status(500).json({error:err.code});
    })
}