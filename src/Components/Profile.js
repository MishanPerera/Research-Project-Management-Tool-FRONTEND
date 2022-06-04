import React,{useEffect, useState} from 'react'
import { Grow, Dialog, DialogActions, DialogContent, DialogTitle, Divider } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios';
import Navbar from './Navbar';

function Profile() {
    const accessToken = sessionStorage.getItem('userToken');
    const [values,setValues]=useState({});
    const [userValue, setUserValue] = useState({
        fullname: '',
        gender: 'male',
        dob: '',
        contactNumber: '',
        department: '',
        faculty: '',
        interestField: ''
    })

    const authAxios = axios.create({
        baseURL: 'http://localhost:4000',
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    })

    const [isEdit,setIsEdit]=useState(false);
    const handleEditOpen=()=> setIsEdit(true);
    const handleEditClose=()=> setIsEdit(false);

    const handleChange = (event) =>{
        setUserValue({...userValue,
            [event.target.name]:event.target.value,
        })
    }

    const handleSubmit = (event) =>{
        event.preventDefault();
        
        authAxios.put('/profile', userValue).then(res=>{
            console.log(res)
        })
    }

    const handleEditData = ()=> {
        return(
            <Grow in={isEdit} {...(isEdit ? { timeout: 500 } : {})}>
            <Dialog open={isEdit} onClose={handleEditClose} keepMounted maxWidth={'md'} aria-labelledby="responsive-dialog-title">
                <DialogTitle id="responsive-dialog-title">
                    Are You Sure to Edit User Data?
                <Divider/>
                </DialogTitle>
                <DialogContent>
                <form>
                <div className='form-group mb-3'>
                    <label className="form-label d-block" htmlFor="fullname">
                        <h6>Fullname</h6>
                    </label>
                    <div class="input-group mb-4">
                        <input type="text" name="fullname" className="form-control" placeholder="Enter Fullname" value={userValue.fullname} onChange={handleChange}id='fullname'/>
                    </div>
                </div>
                <div className='form-group mb-3'>
                    <label className="form-label d-block" htmlFor="gender">
                        <h6>Gender</h6>
                    </label>
                    <div class="input-group">
                        <select className="form-select form-control" name='gender' id='gender' onChange={handleChange} aria-label="Default select Gender">
                            <option selected value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>
                </div>
                <div className='form-group mb-3'>
                    <label className="form-label d-block" htmlFor="dob">
                        <h6>Date of Birth</h6>
                    </label>
                    <div class="input-group mb-4">
                        <input type="date" name="dob" className="form-control" placeholder="Enter Date Of Birth" value={userValue.dob} onChange={handleChange} id='dob'/>
                    </div>
                </div>
                <div className='form-group mb-3'>
                    <label className="form-label d-block" htmlFor="contactNumber">
                        <h6>Contact Number</h6>
                    </label>
                    <div class="input-group mb-4">
                        <input type="number" name="contactNumber" className="form-control" placeholder="Enter Contact Number" value={userValue.contactNumber} onChange={handleChange} id='contactNumber'/>
                    </div>
                </div>
                <div className='form-group mb-3'>
                    <label className="form-label d-block" htmlFor="department">
                        <h6>Department</h6>
                    </label>
                    <div class="input-group mb-4">
                        <input type="text" name="department" className="form-control" placeholder="Enter Department" value={userValue.department} onChange={handleChange}id='department'/>
                    </div>
                </div>
                <div className='form-group mb-3'>
                    <label className="form-label d-block" htmlFor="faculty">
                        <h6>Faculty</h6>
                    </label>
                    <div class="input-group mb-4">
                        <input type="text" name="faculty" className="form-control" placeholder="Enter Faculty" value={userValue.faculty} onChange={handleChange}id='faculty'/>
                    </div>
                </div>
                <div className='form-group mb-3'>
                    <label className="form-label d-block" htmlFor="interestField">
                        <h6>Interest Field</h6>
                    </label>
                    <div class="input-group mb-4">
                        <input type="text" name="interestField" className="form-control" placeholder="Enter Interest Field" value={userValue.interestField} onChange={handleChange} id='interestField'/>
                    </div>
                </div>
                </form>
                </DialogContent>
                <DialogActions>
                    <div>
                        <input type='submit' className='btn btn-success m-2' onClick={handleSubmit} value='Yes, Edit User Data!'/>
                        <input type='reset' className='btn btn-danger m-2' onClick={handleEditClose} value='NO'/>
                    </div>
                </DialogActions>
            </Dialog>
        </Grow>
        )
    }

    useEffect(()=>{
        authAxios.get('/user').then(res=>{
            setValues(res.data);
        })
    },[])

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
                <button type="button" className="btn btn-sm btn-rounded btn-success" onClick={handleEditOpen}>Edit</button>
            </div>
        </div>
        <br/>
        <section class="text-center">
                    <hr/>
                    <h4>Email: {values.email}</h4>
                    <h4>Fullname: {(values.fullname) ? values.fullname:" --UNSET-- "}</h4>
                    <h4>Gender: {(values.gender) ? values.gender:" --UNSET-- "}</h4>
                    <h4>DOB: {(values.dob) ? values.dob:" --UNSET-- "}</h4>
                    <h4>Contact Number: {(values.contactNumber) ? values.contactNumber:" --UNSET-- "}</h4>
                    <h4>Department: {(values.department) ? values.department:" --UNSET-- "}</h4>
                    <h4>Faculty: {(values.faculty) ? values.faculty:" --UNSET-- "}</h4>
                    <h4>interest Field: {(values.interestField) ? values.interestField:" --UNSET-- "}</h4>
        </section>
        {handleEditData()}
        </>
    )
}

export default Profile