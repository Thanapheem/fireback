// check email
const isEmail = (email) => {
    const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email.match(regEx)) return true;
    else return false ;
  }
  const isEmpty=(string)=>{
      if(string.trim()==='') return true;
      else return false;
  }
 
  // check data ตอนสมัคร
  exports.valdsignup =(data) =>{
    let errors = {};
    if(isEmpty(data.email)){
        errors.email = "กรอกอีเมล์ให้ครบถ้วน";
    }else if (!isEmail(data.email)){
        errors.email = 'กรอกอีเมล์ให้ถูกต้อง'
    }
    if(isEmpty(data.password)) errors.password = "กรุณากรอกรหัสผ่าน"
    if(data.password !== data.confirmpassword) 
    errors.confirmpassword = 'รหัสผ่านไม่ถูกต้อง';
    if(isEmpty(data.username)) errors.username = 'กรอกชื่อผู้ใช้';
    return {
      errors, valid : Object.keys(errors).length===0 ? true: false
    };
  };
 
  exports.valdlogin = (user)=>{
    let errors = {};
    if(isEmpty(user.email))errors.email = 'กรอกอีเมล์';
    if(isEmpty(user.password)) errors.password = "กรอกรหัสผ่าน";
    return {
      errors, valid : Object.keys(errors).length===0 ? true: false
    };

  };

