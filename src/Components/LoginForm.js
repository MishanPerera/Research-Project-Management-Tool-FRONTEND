import React,{useState, useRef, useEffect} from 'react';
import axios from 'axios';
import {useParams} from "react-router-dom";
import Typography from '@mui/material/Typography';

import welcome from '../Assets/welcome.jpg';
import '../CSS/LoginForm.css';
import {LoginValidate} from './Validate';

export default function LoginForm() {
    const params = useParams();
    const [values,setValues]=useState({
        email:'',
        password:'',
        role: params.role
    });

    // Used to refer input fields
    const inputUserEmail=useRef();
    const inputPassword=useRef();

    const handleChange=(event)=>{
        setValues({...values,
            [event.target.name]:event.target.value,
        })
    }

    const [errors,setErrors]=useState({});

    const handleSubmit= (event)=>{
        event.preventDefault();
        // Make Sure there is no spaces trailing and leading
        Object.keys(values).map(k=>values[k]=values[k].trim());
        // Validate input Fields
        setErrors(LoginValidate(values));
    }

    useEffect(() => {
        if(Object.keys(errors).length === 0  && values.email !=='' && values.password !==''){
            axios.post('http://localhost:4000/sign-in',values).then((res)=>{
                let userToken = res.data.token;
                let userRole = values.role

                if(userToken !== null) {
                    sessionStorage.setItem('isAuth',"true");
                    sessionStorage.setItem('userToken', userToken);
                    sessionStorage.setItem('userRole',userRole);
                    setInterval(()=> window.location.pathname = "/home",1000)
                }
            }).catch(e => {
                console.log('Error:', e.message)
            }
            );
        }
    }, [errors])

    return (
        <div className='body'>
            <div className='appointment-container'>
                <div className='title'>Login</div>
                <div className='container login-form'>
                    <div className='left login'>
                        <img src={welcome} alt="welcome user"/>
                        <div>
                            <Typography gutterBottom variant="h4" component="div" align='center'>Hello, {String(values.role).charAt(0).toUpperCase().concat(String(values.role).slice(1))}</Typography>
                            <Typography variant="body2" color="text.secondary" align='center'>Enter your personal details and start your journey</Typography>
                        </div>
                    </div>
                    <div className='right'>
                <form action='#'>
                    <div className='user-details'>
                    <div className='input-box'>
                        <label htmlFor='useremail' className='details'>Email</label>
                        <div className='input-group'>
                        <input id='useremail' autocomplete="off" ref={inputUserEmail} type='text' name='email' placeholder='useremail' value={values.email} onChange={handleChange}/>
                        <i className='fa fa-user left-icon'/>
                        <i className={!errors.email?'fa fa-times right-icon':'fa fa-exclamation right-icon'} onClick={()=>{
                            inputUserEmail.current.focus();
                            inputUserEmail.current.value='';
                            values.email='';
                        }}/>
                        </div>
                        {errors.email && <p className='note note-warning error'>{errors.email}</p>}
                    </div>
                    <div className='input-box'>
                        <label htmlFor='password'className='details'>Password</label>
                        <div className='input-group'>
                        <input id='password' ref={inputPassword} type='password' name='password' placeholder='Password'value={values.password}
                        onChange={handleChange}/>
                        <i className='fa fa-key left-icon'/>
                        <i className={!errors.password?'fa fa-times right-icon':'fa fa-exclamation right-icon'} onClick={()=>{
                            inputPassword.current.focus();
                            inputPassword.current.value='';
                            values.password='';
                        }}/>
                        </div>
                        {errors.password && <p className='note note-warning error'>{errors.password}</p>}
                    </div>
                    </div>
                    <div className='button'>
                        <input type='submit' onClick={handleSubmit} value='Login'/>
                    </div>
                </form>
                </div>
                </div>
            </div>
        </div>
    );
}