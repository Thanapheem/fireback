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
        errors.email = "Email is empty";
    }else if (!isEmail(data.email)){
        errors.email = 'type right email pls'
    }
    if(isEmpty(data.password)) errors.password = "must enter password"
    if(data.password !== data.confirmpassword) 
    errors.confirmpassword = 'password not match';
    if(isEmpty(data.username)) errors.username = 'Must Enter';
    return {
      errors, valid : Object.keys(errors).length===0 ? true: false
    };
  };
 
  exports.valdlogin = (user)=>{
    let errors = {};
    if(isEmpty(user.email))errors.email = 'must not empty';
    if(isEmpty(user.password)) errors.password = "Enter pass";
    return {
      errors, valid : Object.keys(errors).length===0 ? true: false
    };

  };

