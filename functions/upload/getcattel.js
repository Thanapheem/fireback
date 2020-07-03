const {db} = require("../config/admin");


//ลงทะเบียนโค
exports.getcattle  = (req,res)=>{
    const cattledata = {
        name : req.body.name,
        detail : req.body.detail,
        type : req.body.type,
        userhandle : req.user.username,
        cattleid : req.body.cattleid,
        weight : req.body.weight,
        gender : req.body.gender,
        spicies : req.body.spicies,
        price : req.body.price,
        birthdate : req.body.birthdate,
        dadname : req.body.dadname,
        momname : req.body.momname,
        createAt: new Date().toISOString() 
    };
    db.collection("cattle")
    .add(cattledata)
    .then((doc)=>{
        const resCattle = cattledata;
        resCattle.cowid =doc.id;
        res.json(resCattle);
    })
    .catch((err)=>{
        res.status(500).json({error : 'get wrong'});
    })

}

///เพิ่ม แก้ไขข้อมูล
exports.editCattle = (req,res) =>{
    let cowdata = (req.body);
    db.doc(`/cattle/${req.params.cowid}`)
    .update(cowdata)
    .then(()=>{
        return res.json({message: ' finished'});
       
    })
    .catch(err=>{
        console.error(err);
        return res.status(500).json({error: err.code})
    })

}