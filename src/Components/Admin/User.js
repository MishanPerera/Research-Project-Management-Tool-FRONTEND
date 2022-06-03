import React, {useEffect, useState} from 'react'
import axios from 'axios';

import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { DialogActions, DialogContent ,Dialog, DialogTitle ,Grow ,useMediaQuery, useTheme ,Divider} from '@mui/material';

import { UserDetailsValidate } from './Validate';
import Navbar from './Navbar'

export default function User() {
    const accessToken = sessionStorage.getItem('userToken');
    const [values,setValues]=useState([]);
    const [userId,setUserId]=useState();
    const [userValue, setUserValue] = useState({
        username: '',
        email: '',
        password: '',
        role: 'supervisor'
    })

    const authAxios = axios.create({
        baseURL: 'http://localhost:4000',
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    })

    const [errors,setErrors]=useState({});

    const postData = ()=>{
        console.log(errors)
        if(userValue.username !== '' && userValue.email !== '' && userValue.password !== '' && userValue.role !== '' ){
            authAxios.post('/sign-up',userValue).then(res=>{
                    handleAddClose();
                    toast.success("User added Successfully",{
                        position: "top-center",
                        autoClose: 1000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: false,
                        progress: undefined,
                    })
                authAxios.get('/users').then(res=>{
                    setValues(res.data);
                })
            }).catch(e =>{
                if(e.response){
                    toast.error(e.response.data.msg,{
                        position: "top-center",
                        autoClose: 1000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: false,
                        progress: undefined,
                    })
                }else console.log('Error',e.message)
            })
        }
    }

    const handleSubmit = (event)=>{
        event.preventDefault();
        // Make Sure there is no spaces trailing and leading
        Object.keys(userValue).map(k=>userValue[k]=String(userValue[k]).trim());
        // Validate input Fields
        setErrors(UserDetailsValidate(userValue));
        postData();
    }

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const [isAdd,setIsAdd]=useState(false);
    const handleAddOpen=()=> setIsAdd(true)
    const handleAddClose=()=> setIsAdd(false)
    
    const [isDelete,setIsDelete]=useState(false);
    const handleDeleteOpen=()=> setIsDelete(true)
    const handleDeleteClose=()=> setIsDelete(false)

    const handleChange=(event)=>{
        setUserValue({...userValue,
            [event.target.name]:event.target.value,
        })
    }

    const handleUser = (userType) => {
        let userCount = 0
        return(
            <>
            <div className="card align-items-center table-responsive pb-2">
                <h5 className='text-center'>{String(userType).charAt(0).toUpperCase().concat(String(userType).slice(1))}</h5>
                <table className="table table-dark table-bordered">
                <thead className="bg-light">
                    <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Date</th>
                        <th className='text-center'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        values ? values.filter((val)=>{
                                if(val.role.toLowerCase().includes(userType)) return val
                            }).map(values=> (
                            <tr key={values._id} className='table-light'>
                                <td width="10%">{++userCount}</td>
                                <td width="20%">{values.username}</td>
                                <td width="30%">{values.email}</td>
                                <td width="10%">{String(values.role).charAt(0).toUpperCase().concat(String(values.role).slice(1))}</td>
                                <td width="15%">{values.register_date.split('T')[0]} {values.register_date.split('T')[1].split('.')[0]}</td>
                                <td className='text-center' width="15%">
                                    <button type="button" className="btn btn-sm btn-rounded btn-warning m-2" onClick={()=>{
                                
                                    }}>Edit</button>
                                    <button type="button" className="btn btn-sm btn-rounded btn-danger m-2" onClick={()=>{
                                        setUserId(values._id);
                                        handleDeleteOpen()
                                    }}>Delete</button>
                                </td>
                            </tr>
                        )
                        ):null
                    }
                </tbody>
                </table>
            </div>
            {handleDelete()}
            </>
        )
    }
    const handleUserData = ()=> {
        return(
            <Grow in={isAdd} {...(isAdd ? { timeout: 500 } : {})}>
                <Dialog open={isAdd} onClose={handleAddClose} keepMounted maxWidth={'md'} fullScreen={fullScreen} aria-labelledby="responsive-dialog-title">
                    <DialogTitle id="responsive-dialog-title">
                        Are You Sure to Add User Details?
                    <Divider/>
                    </DialogTitle>
                    <DialogContent>
                        <form>
                            <div className="form-group">
                                <label className="form-label d-block" htmlFor="username">
                                    <h6>User Name</h6>
                                </label>
                                <div class="input-group mb-4">
                                    <input type="text" name="username" className="form-control" placeholder="Enter User Name" value={userValue.username} onChange={handleChange} id='username'/>
                                </div>
                                {errors.email && <p className='note note-warning error'>{errors.username}</p>}
                            </div>
                            <div className="form-group">
                                <label className="form-label d-block" htmlFor="useremail">
                                    <h6>User Email</h6>
                                </label>
                                <div class="input-group mb-4">
                                    <input type="text" placeholder="Enter User Email" className="form-control" value={userValue.email} id='useremail' onChange={handleChange}  name="email"/>
                                </div>
                                {errors.email && <p className='note note-warning error'>{errors.email}</p>}
                            </div>
                            <div className="form-group">
                                <label className="form-label d-block" htmlFor="userpassword">
                                    <h6>User Password</h6>
                                </label>
                                <div class="input-group mb-4"> 
                                    <input type="password" name="password" className="form-control" placeholder="Enter User Password"  value={userValue.password} onChange={handleChange}  id='userpassword'/>
                                </div>
                                {errors.email && <p className='note note-warning error'>{errors.password}</p>}
                            </div>
                            <div className="form-group">
                                <label className="form-label d-block" htmlFor="userrole">
                                    <h6>User Role</h6>
                                </label>
                                <div class="input-group">
                                    <select className="form-select form-control" name='role' id='userrole' onChange={handleChange} aria-label="Default select example">
                                        <option selected value="supervisor">Co-Supervisor/Supervisor</option>
                                        <option value="panel member">Panel Member</option>
                                        <option value="student">Student</option>
                                    </select>
                                </div>
                            </div>
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <div>
                            <input type='submit' className='btn btn-success m-2' onClick={handleSubmit} value='Yes, Add User!'/>
                            <input type='reset' className='btn btn-danger m-2' onClick={handleAddClose} value='NO'/>
                        </div>
                    </DialogActions>
                </Dialog>
            </Grow>
        )
    }
    const handleDelete = () =>{
        return(
            <Grow in={isDelete} {...(isDelete ? { timeout: 500 } : {})}>
            <Dialog open={isDelete} onClose={handleDeleteClose} keepMounted maxWidth={'md'} aria-labelledby="responsive-dialog-title">
                <DialogTitle id="responsive-dialog-title">
                    Are You Sure to Delete?
                <Divider/>
                </DialogTitle>
                <DialogActions>
                    <div>
                        <input type='submit' className='btn btn-danger m-2' onClick={()=>{
                            authAxios.delete(`/delete-user/${values._id}`).then(res=>{
                                authAxios.get('/users').then(res=>{
                                    setValues(res.data);
                                    })
                                })
                            handleDeleteClose()
                        }} value='Yes'/>
                        <input type='reset' className='btn btn-success m-2' onClick={handleDeleteClose} value='NO'/>
                    </div>
                </DialogActions>
            </Dialog>
            </Grow>
        )
    }

    useEffect(()=>{
        authAxios.get('/users').then(res=>{
            setValues(res.data);
        })
        
    },[errors])

    return (
        <>
            <Navbar/>
            <br/>
            <ToastContainer/>
            <div className="row justify-content-between">
                <div className="col-4 m-2">
                    <h3 className='text-start title'>User Details</h3>
                </div>
                <div className="col-4 text-end m-2">
                    <button type="button" className="btn btn-sm btn-rounded btn-success" onClick={()=>{
                        handleAddOpen()
                        setUserValue({  
                            username: '',
                            email: '',
                            password: '',
                            role: 'supervisor'
                        })
                        }}>Add</button>
                </div>
            </div>
            <br/>
            <div className="row d-flex justify-content-center">
                {handleUser("supervisor")}
                {handleUser("panel member")}
                {handleUser("student")}
            </div>
            {handleUserData()}
        </>
    )
}