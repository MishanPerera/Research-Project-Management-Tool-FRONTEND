const LoginValidate = (values) => {
    let errors={}
    if(!values.email){
        errors.email="Email is Required"
    }else if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(values.email)){
        errors.email="Email address invalid"
    }

    if(!values.password){
        errors.password="Password is Required"
    }

    return errors;
};

const UserDetailsValidate = (values) =>{
    let errors = {}

    if(!values.username){
        errors.username="Username is Required"
    }
    if(!values.password){
        errors.password="Password is Required"
    }else if(values.password.length < 6){
        errors.password="Password needs to be atleast 6 characters in length"
    }
    if(!values.userconfirmpass){
        errors.userconfirmpass="Password is Required"
    }else if(values.userconfirmpass!==values.password){
        errors.userconfirmpass="Password do not match"
    }
    if(!values.email){
        errors.email="Email is Required"
    }else if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(values.email)){
        errors.email="Email address invalid"
    }
    
    return errors;

}
export {
    LoginValidate, 
    UserDetailsValidate
};