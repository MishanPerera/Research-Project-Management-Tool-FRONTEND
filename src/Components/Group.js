import React,{useEffect, useState} from 'react'
import { Grow, Dialog, DialogActions, DialogContent, DialogTitle, Divider } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios';
import Navbar from './Navbar';

function Group() {
    const accessToken = sessionStorage.getItem('userToken');
    const role = sessionStorage.getItem("userRole");
    let groupCount = 0;
    let topicCount = 0;
    let messageCount = 0;

    const [values,setValues]=useState([]);
    const [groupDetails,setGroupDetails]=useState([]);
    const [panelDetails,setPanelDetails]=useState();
    const [id,setId]=useState();
    const [topicDetails,setTopicDetails]=useState([]);
    const [messageDetails,setMessageDetails]=useState([]);
    const [isAuth,setIsAuth] = useState(false);

    const [groupValue, setGroupValue] = useState({
        name: '',
        description: '',
        members: '',
        supervisorId: '',
    })

    const [topicValue, setTopicValue] = useState({
        leaderId: '',
        supervisorId: '',
        message: ''
    })

    const [sendValue, setSendValue] = useState({
        description: '',
        supervisorId: '',
        leaderId: '',
    })

    const authAxios = axios.create({
        baseURL: 'http://localhost:4000',
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    })

    const [isGroup,setIsGroup]=useState(false);
    const handleGroupOpen=()=> setIsGroup(true);
    const handleGroupClose=()=> setIsGroup(false);

    const [isTopic,setIsTopic]=useState(false);
    const handleTopicOpen=()=> setIsTopic(true);
    const handleTopicClose=()=> setIsTopic(false);

    const [isSend,setIsSend]=useState(false);
    const handleSendOpen=()=> setIsSend(true);
    const handleSendClose=()=> setIsSend(false);

    const [isPanel,setIsPanel]=useState(false);
    const handlePanelOpen=()=> setIsPanel(true);
    const handlePanelClose=()=> setIsPanel(false);

    const handleGroupChange = (event) =>{
        setGroupValue({...groupValue,
            [event.target.name]:event.target.value,
        })
    }

    const handleTopicChange = (event) =>{
        setTopicValue({...topicValue,
            [event.target.name]:event.target.value,
        })
    }

    const handleSendChange = (event) =>{
        setSendValue({...sendValue,
            [event.target.name]:event.target.value,
        })
    }
    const handleGroupSubmit = (event) =>{
        event.preventDefault();

        if(groupValue.name !== '' && groupValue.description !=='' && groupValue.members !== '' && groupValue.supervisorId !== ''){
            authAxios.post('/add-group', groupValue).then(res=>{
                toast.success("Group Created",{
                    position: "top-center",
                    autoClose: 1000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: false,
                    progress: undefined,
                })
                console.log(res)
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

    const handleTopicSubmit = (event) =>{
        event.preventDefault();

        if(!isAuth){
            toast.error("Create a group",{
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
            })
        }
        if(isAuth && topicValue.name !== '' && topicValue.description !=='' && topicValue.supervisorId !== ''){
            authAxios.post('/add-topic', topicValue).then(res=>{
                toast.success("Topic Created",{
                    position: "top-center",
                    autoClose: 1000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: false,
                    progress: undefined,
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

    const handleSendSubmit = (event) =>{
        event.preventDefault();

        if(sendValue.supervisorId !== '' && sendValue.message !=='' ){
            authAxios.post('/student-message', sendValue).then(res=>{
                toast.success("Message Delivered",{
                    position: "top-center",
                    autoClose: 1000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: false,
                    progress: undefined,
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

    const handlePanelSubmit = (event) =>{
        event.preventDefault();

        if(panelDetails.panelId !== ''){
            authAxios.put(`/add-panel/${id}`, panelDetails).then(res=>{
                toast.success("Panel Details Updated",{
                    position: "top-center",
                    autoClose: 1000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: false,
                    progress: undefined,
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

    const handleGroupData = ()=> {
        return(
            <Grow in={isGroup} {...(isGroup ? { timeout: 500 } : {})}>
            <Dialog open={isGroup} onClose={handleGroupClose} keepMounted maxWidth={'md'} aria-labelledby="responsive-dialog-title">
                <DialogTitle id="responsive-dialog-title">
                    Are You Sure to Add Group Details?
                <Divider/>
                </DialogTitle>
                <DialogContent>
                <form>
                <div className='form-group mb-3'>
                    <label className="form-label d-block" htmlFor="name">
                        <h6>Group Name</h6>
                    </label>
                    <div class="input-group mb-4">
                        <input type="text" name="name" className="form-control" placeholder="Enter Group Name" value={groupValue.name} onChange={handleGroupChange} id='name'/>
                    </div>
                </div>
                <div className='form-group mb-3'>
                    <label className="form-label d-block" htmlFor="description">
                        <h6>Group Description</h6>
                    </label>
                    <div class="input-group mb-4">
                        <input type="text" name="description" className="form-control" placeholder="Enter Group Details" value={groupValue.description} onChange={handleGroupChange} id='description'/>
                    </div>
                </div>
                <div className='form-group mb-3'>
                    <label className="form-label d-block" htmlFor="members">
                        <h6>Members</h6>
                    </label>
                    <div class="input-group mb-4">
                        <input type="text" name="members" className="form-control" placeholder="Group Members (Eg:[1234,5678])" value={groupValue.members} onChange={handleGroupChange} id='members'/>
                    </div>
                </div>
                <div className='form-group mb-3'>
                    <label className="form-label d-block" htmlFor="supervisorId">
                        <h6>Supervisor</h6>
                    </label>
                    <div class="input-group">
                        <select className="form-select form-control" name='supervisorId' id='supervisorId' onChange={handleGroupChange} aria-label="Default select Supervisor">
                            <option selected>---- Select Supervisor ----</option>
                            {
                                values ? values.filter((val)=>{
                                    if(val.role.toLowerCase().includes("supervisor")) return val
                                }).map(values=> (
                                    <option value={values._id}>{values.username}</option>
                                )
                                ):null
                            }
                        </select>
                    </div>
                </div>
                </form>
                </DialogContent>
                <DialogActions>
                    <div>
                        <input type='submit' className='btn btn-success m-2' onClick={handleGroupSubmit} value='Yes, Add Group Data!'/>
                        <input type='reset' className='btn btn-danger m-2' onClick={handleGroupClose} value='NO'/>
                    </div>
                </DialogActions>
            </Dialog>
        </Grow>
        )
    }

    const handleTopicData = ()=>{
        return(
            <Grow in={isTopic} {...(isTopic ? { timeout: 500 } : {})}>
            <Dialog open={isTopic} onClose={handleTopicClose} keepMounted maxWidth={'md'} aria-labelledby="responsive-dialog-title">
                <DialogTitle id="responsive-dialog-title">
                    Are You Sure to Add Topic Details?
                <Divider/>
                </DialogTitle>
                <DialogContent>
                <form>
                <div className='form-group mb-3'>
                    <label className="form-label d-block" htmlFor="name">
                        <h6>Topic Name</h6>
                    </label>
                    <div class="input-group mb-4">
                        <input type="text" name="name" className="form-control" placeholder="Enter Topic Name" value={topicValue.name} onChange={handleTopicChange} id='name'/>
                    </div>
                </div>
                <div className='form-group mb-3'>
                    <label className="form-label d-block" htmlFor="description">
                        <h6>Topic Description</h6>
                    </label>
                    <div class="input-group mb-4">
                        <input type="text" name="description" className="form-control" placeholder="Enter Topic Details" value={topicValue.description} onChange={handleTopicChange} id='description'/>
                    </div>
                </div>
                <div className='form-group mb-3'>
                    <label className="form-label d-block" htmlFor="supervisor">
                        <h6>Supervisor</h6>
                    </label>
                    <div class="input-group">
                        <select className="form-select form-control" name='supervisorId' id='supervisor' onChange={handleTopicChange} aria-label="Default select Supervisor">
                            <option selected>---- Select Supervisor ----</option>
                            {
                                values ? values.filter((val)=>{
                                    if(val.role.toLowerCase().includes("supervisor")) return val
                                }).map(values=> (
                                    <option value={values._id}>{values.username}</option>
                                )
                                ):null
                            }
                        </select>
                    </div>
                </div>
                </form>
                </DialogContent>
                <DialogActions>
                    <div>
                        <input type='submit' className='btn btn-success m-2' onClick={handleTopicSubmit} value='Yes, Add Topic Data!'/>
                        <input type='reset' className='btn btn-danger m-2' onClick={handleTopicClose} value='NO'/>
                    </div>
                </DialogActions>
            </Dialog>
            </Grow>
        )
    }

    const handleSendMessage = ()=>{
        return(
            <Grow in={isSend} {...(isSend ? { timeout: 500 } : {})}>
            <Dialog open={isSend} onClose={handleSendClose} keepMounted maxWidth={'md'} aria-labelledby="responsive-dialog-title">
                <DialogTitle id="responsive-dialog-title">
                    Are You Sure to Send a Meassge?
                <Divider/>
                </DialogTitle>
                <DialogContent>
                <form>
                    <div className='form-group mb-3'>
                    <label className="form-label d-block" htmlFor="supervisor">
                        <h6>Supervisor</h6>
                    </label>
                    <div class="input-group">
                        <select className="form-select form-control" name='supervisorId' id='supervisor' onChange={handleSendChange} aria-label="Default select Supervisor">
                            <option selected>---- Select Supervisor ----</option>
                            {
                                values ? values.filter((val)=>{
                                    if(val.role.toLowerCase().includes("supervisor")) return val
                                }).map(values=> (
                                    <option value={values._id}>{values.username}</option>
                                )
                                ):null
                            }
                        </select>
                    </div>
                    </div>
                <div className='form-group mb-3'>
                    <label className="form-label d-block" htmlFor="message">
                        <h6>Message</h6>
                    </label>
                    <div class="input-group mb-4">
                        <input type="text" name="message" className="form-control" placeholder="Enter Your Message" value={sendValue.message} onChange={handleSendChange} id='message'/>
                    </div>
                </div>
                </form>
                </DialogContent>
                <DialogActions>
                    <div>
                        <input type='submit' className='btn btn-success m-2' onClick={handleSendSubmit} value='Yes, Send Message!'/>
                        <input type='reset' className='btn btn-danger m-2' onClick={handleSendClose} value='NO'/>
                    </div>
                </DialogActions>
            </Dialog>
            </Grow>
        )
    }
    const handlePanel = () =>{
        return(
            <Grow in={isPanel} {...(isPanel ? { timeout: 500 } : {})}>
            <Dialog open={isPanel} onClose={handlePanelClose} keepMounted maxWidth={'md'} aria-labelledby="responsive-dialog-title">
                <DialogTitle id="responsive-dialog-title">
                    Are You Sure to Add Group Details?
                <Divider/>
                </DialogTitle>
                <DialogContent>
                <form>
                <div className='form-group mb-3'>
                    <label className="form-label d-block" htmlFor="panelId">
                        <h6>Panel Member</h6>
                    </label>
                    <div class="input-group">
                        <select className="form-select form-control" name='panelId' id='panelId' onChange={e=>{
                            setPanelDetails({panelId : e.target.value})
                        }} aria-label="Default select Supervisor">
                            <option selected>---- Select Panel Member ----</option>
                            {
                                values ? values.filter((val)=>{
                                    if(val.role.toLowerCase().includes("panel member")) return val
                                }).map(values=> (
                                    <option value={values._id}>{values.username}</option>
                                )
                                ):null
                            }
                        </select>
                    </div>
                </div>
                </form>
                </DialogContent>
                <DialogActions>
                    <div>
                        <input type='submit' className='btn btn-success m-2' onClick={handlePanelSubmit} value='Yes, Add Panel Data!'/>
                        <input type='reset' className='btn btn-danger m-2' onClick={handlePanelClose} value='NO'/>
                    </div>
                </DialogActions>
            </Dialog>
        </Grow>
        )
    }

    useEffect(()=>{
        if(role === 'student'){
            authAxios.get('/users').then(res=>{
                setValues(res.data);
            })
            authAxios.get('/group').then(res=>{
                if(res) setIsAuth(true)
                setGroupDetails(res.data)
            })
            authAxios.get('/topic').then(res=>{
                setTopicDetails(res.data)
            })
            authAxios.get('/message').then(res=>{
                setMessageDetails(res.data)
            })
        }
        else if(role === 'supervisor'){
            authAxios.get('/users').then(res=>{
                setValues(res.data);
            })
            authAxios.get('/groups').then(res=>{
                if(res) setIsAuth(true)
                setGroupDetails(res.data)
            })
            authAxios.get('/topics').then(res=>{
                setTopicDetails(res.data)
            })
            authAxios.get('/messages').then(res=>{
                setMessageDetails(res.data)
            })
        }
        else if(role === 'admin'){
            authAxios.get('/users').then(res=>{
                setValues(res.data);
            })
            authAxios.get('/get-groups').then(res=>{
                if(res) setIsAuth(true)
                setGroupDetails(res.data)
            })
        }
        else{
            authAxios.get('/get-topics').then(res=>{
                setTopicDetails(res.data)
            })
        }
    },[])

    if(role === 'student'){
        return (
        <>
        <Navbar/>
        <br/>
        <ToastContainer/>
        <div className="row justify-content-between">
            <div className="col-4 m-2">
                <h3 className='text-start title'>Group Details</h3>
            </div>
            <div className="col-4 text-end m-2">
                <button type="button" className="btn btn-sm btn-rounded btn-success" onClick={handleGroupOpen}>Add</button>
            </div>
        </div>
        <div className="card align-items-center table-responsive pb-2">
            <table className="table table-dark table-bordered">
            <thead className="bg-light">
                <tr>
                    <th>No</th>
                    <th>Group Name</th>
                    <th>Group Description</th>
                    <th>Members</th>
                    <th>Panel Member</th>
                    <th className='text-center'>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    groupDetails ? groupDetails.map( groupDetails=> (
                        <tr key={groupDetails._id} className='table-light'>
                            <td width="10%">{++groupCount}</td>
                            <td width="50%">{groupDetails.name}</td>
                            <td width="20%">{groupDetails.description}</td>
                            <td width="20%">{
                                groupDetails.members?
                                    groupDetails.members.map(groupDetails=>(
                                        <>{groupDetails}<br/></>
                                            )): null}
                            </td>
                            <td width="20%">{groupDetails.panelmember}</td>
                            <td className='text-center' width="20%">
                                <button type="button" className="btn btn-sm btn-rounded btn-danger m-2" onClick={()=>{
                                    authAxios.delete(`/delete-group/${groupDetails._id}`,(req, res)=>{
                                        console.log('Deleted')})
                                }}>Delete</button>
                            </td>
                        </tr>
                    )
                    ):null
                }
            </tbody>
            </table>
        </div>
        <div className="row justify-content-between">
            <div className="col-4 m-2">
                <h3 className='text-start title'>Topic Details</h3>
            </div>
            <div className="col-4 text-end m-2">
                <button type="button" className="btn btn-sm btn-rounded btn-success" onClick={handleTopicOpen}>Add</button>
            </div>
        </div>
        <div className="card align-items-center table-responsive pb-2">
            <table className="table table-dark table-bordered">
            <thead className="bg-light">
                <tr>
                    <th>No</th>
                    <th>Topic Name</th>
                    <th>Topic Description</th>
                    <th>Approved Status</th>
                    <th>Evaluate Status</th>
                    <th className='text-center'>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    topicDetails ? topicDetails.map( topicDetails=> (
                        <tr key={topicDetails._id} className='table-light'>
                            <td width="10%">{++topicCount}</td>
                            <td width="50%">{topicDetails.name}</td>
                            <td width="20%">{topicDetails.description}</td>
                            <td width="20%">{topicDetails.isApprove}</td>
                            <td width="20%">{topicDetails.isEvaluate}</td>
                            <td className='text-center' width="20%">
                                <button type="button" className="btn btn-sm btn-rounded btn-danger m-2" onClick={()=>{
                                    authAxios.delete(`/delete-topic/${topicDetails._id}`,(req, res)=>{
                                        console.log('Deleted')})
                                }}>Delete</button>
                            </td>
                        </tr>
                    )
                    ):null
                }
            </tbody>
            </table>
        </div>
        <div className="row justify-content-between">
            <div className="col-4 m-2">
                <h3 className='text-start title'>Group Chat</h3>
            </div>
            <div className="col-4 text-end m-2">
                <button type="button" className="btn btn-sm btn-rounded btn-success" onClick={handleSendOpen}>Send</button>
            </div>
        </div>
        <div className="card align-items-center table-responsive pb-2">
            <table className="table table-dark table-bordered">
            <thead className="bg-light">
                <tr>
                    <th>No</th>
                    <th>Message</th>
                    <th>Date</th>
                </tr>
            </thead>
            <tbody>
                {
                    messageDetails ? messageDetails.map( messageDetails=> (
                        <tr key={messageDetails._id} className='table-light'>
                            <td width="10%">{++messageCount}</td>
                            <td width="50%">{messageDetails.message}</td>
                            <td width="20%">{messageDetails.sendAt}</td>
                        </tr>
                    )
                    ):null
                }
            </tbody>
            </table>
        </div>
        {handleGroupData()}
        {handleTopicData()}
        {handleSendMessage()}
        </>
        )
    }
    else if(role === 'supervisor'){
        return (
        <>
        <Navbar/>
        <br/>
        <ToastContainer/>
        <div className="row justify-content-between">
            <div className="col-4 m-2">
                <h3 className='text-start title'>Group Details</h3>
            </div>
        </div>
        <div className="card align-items-center table-responsive pb-2">
            <table className="table table-dark table-bordered">
            <thead className="bg-light">
                <tr>
                    <th>No</th>
                    <th>Group Name</th>
                    <th>Group Description</th>
                    <th>Members</th>
                    <th>Panel Member</th>
                    <th className='text-center'>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    groupDetails ? groupDetails.map( groupDetails=> (
                        <tr key={groupDetails._id} className='table-light'>
                            <td width="10%">{++groupCount}</td>
                            <td width="50%">{groupDetails.name}</td>
                            <td width="20%">{groupDetails.description}</td>
                            <td width="20%">{
                                groupDetails.members?
                                    groupDetails.members.map(groupDetails=>(
                                        <>{groupDetails}<br/></>
                                            )): null}
                            </td>
                            <td width="20%">{groupDetails.panelmember}</td>
                            <td className='text-center' width="20%">
                                <button type="button" className="btn btn-sm btn-rounded btn-danger m-2" onClick={()=>{
                                    authAxios.delete(`/delete-group/${groupDetails._id}`,(req, res)=>{
                                        console.log('Deleted')
                                })
                                }}>Delete</button>
                            </td>
                        </tr>
                    )
                    ):null
                }
            </tbody>
            </table>
        </div>
        <br/>
        <div className="row justify-content-between">
            <div className="col-4 m-2">
                <h3 className='text-start title'>Topic Details</h3>
            </div>
            <div className="col-4 text-end m-2">
                <button type="button" className="btn btn-sm btn-rounded btn-success" onClick={handleTopicOpen}>Add</button>
            </div>
        </div>
        <div className="card align-items-center table-responsive pb-2">
            <table className="table table-dark table-bordered">
            <thead className="bg-light">
                <tr>
                    <th>No</th>
                    <th>Topic Name</th>
                    <th>Topic Description</th>
                    <th>Approved Status</th>
                    <th>Evaluate Status</th>
                    <th className='text-center'>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    topicDetails ? topicDetails.map( topicDetails=> (
                        <tr key={topicDetails._id} className='table-light'>
                            <td width="10%">{++topicCount}</td>
                            <td width="50%">{topicDetails.name}</td>
                            <td width="20%">{topicDetails.description}</td>
                            <td width="20%">{topicDetails.isApprove}</td>
                            <td width="20%">{topicDetails.isEvaluate}</td>
                            <td className='text-center' width="20%">
                                <button type="button" className="btn btn-sm btn-rounded btn-danger m-2" onClick={()=>{
                                    authAxios.put(`/add-approve/${topicDetails._id}`, {isApprove : true},(req,res)=>{
                                        console.log("Approved")
                                    })
                                }}>Approve</button>
                                <button type="button" className="btn btn-sm btn-rounded btn-danger m-2" onClick={()=>{
                                    authAxios.put(`/add-approve/${topicDetails._id}`, {isApprove : false},(req,res)=>{
                                        console.log("Reject")
                                    })
                                }}>Reject</button>
                            </td>
                        </tr>
                    )
                    ):null
                }
            </tbody>
            </table>
        </div>
        <br/>
        <div className="row justify-content-between">
            <div className="col-4 m-2">
                <h3 className='text-start title'>Group Chat</h3>
            </div>
            <div className="col-4 text-end m-2">
                <button type="button" className="btn btn-sm btn-rounded btn-success" onClick={handleSendOpen}>Send</button>
            </div>
        </div>
        <div className="card align-items-center table-responsive pb-2">
            <table className="table table-dark table-bordered">
            <thead className="bg-light">
                <tr>
                    <th>No</th>
                    <th>Message</th>
                    <th>Date</th>
                    <th className='text-center'>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    messageDetails ? messageDetails.map( messageDetails=> (
                        <tr key={messageDetails._id} className='table-light'>
                            <td width="10%">{++messageCount}</td>
                            <td width="50%">{messageDetails.message}</td>
                            <td width="20%">{messageDetails.sendAt}</td>
                            <td className='text-center' width="20%">
                                <button type="button" className="btn btn-sm btn-rounded btn-danger m-2" onClick={()=>{
                                    authAxios.delete(`/delete-message/${messageDetails._id}`,(req, res)=>{
                                        console.log('Message Deleted')
                                    })
                                }}>Delete</button>
                            </td>
                        </tr>
                    )
                    ):null
                }
            </tbody>
            </table>
        </div>
        {handleSendMessage()}
        </>
        )
    }
    else if(role === 'admin'){
        return (
        <>
        <Navbar/>
        <br/>
        <ToastContainer/>
        <div className="row justify-content-between">
            <div className="col-4 m-2">
                <h3 className='text-start title'>Group Details</h3>
            </div>
        </div>
        <div className="card align-items-center table-responsive pb-2">
            <table className="table table-dark table-bordered">
            <thead className="bg-light">
                <tr>
                    <th>No</th>
                    <th>Group Name</th>
                    <th>Group Description</th>
                    <th>Members</th>
                    <th>Panel Member</th>
                    <th className='text-center'>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    groupDetails ? groupDetails.map( groupDetails=> (
                        <tr key={groupDetails._id} className='table-light'>
                            <td width="10%">{++groupCount}</td>
                            <td width="50%">{groupDetails.name}</td>
                            <td width="20%">{groupDetails.description}</td>
                            <td width="20%">{
                                groupDetails.members?
                                    groupDetails.members.map(groupDetails=>(
                                        <>{groupDetails}<br/></>
                                            )): null}
                            </td>
                            <td width="20%">{groupDetails.panelId ? groupDetails.panelId : "-----"}</td>
                            <td className='text-center' width="20%">
                                <button type="button" className="btn btn-sm btn-rounded btn-success m-2" onClick={()=>{
                                    handlePanelOpen()
                                    setId(groupDetails._id);
                                }}>Add</button>
                            </td>
                        </tr>
                    )
                    ):null
                }
            </tbody>
            </table>
        </div>
        {handlePanel()}
        </>
    )
    }
    else{
        return (
        <>
        <Navbar/>
        <br/>
        <ToastContainer/>
        <div className="row justify-content-between">
            <div className="col-4 m-2">
                <h3 className='text-start title'>Topic Details</h3>
            </div>
            <div className="col-4 text-end m-2">
                <button type="button" className="btn btn-sm btn-rounded btn-success" onClick={handleGroupOpen}>Add</button>
            </div>
        </div>
        <div className="card align-items-center table-responsive pb-2">
            <table className="table table-dark table-bordered">
            <thead className="bg-light">
                <tr>
                    <th>No</th>
                    <th>Topic Name</th>
                    <th>Topic Description</th>
                    <th>Approved Status</th>
                    <th>Evaluate Status</th>
                    <th className='text-center'>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    topicDetails ? topicDetails.map( topicDetails=> (
                        <tr key={topicDetails._id} className='table-light'>
                            <td width="10%">{++topicCount}</td>
                            <td width="50%">{topicDetails.name}</td>
                            <td width="20%">{topicDetails.description}</td>
                            <td width="20%">{topicDetails.isApprove}</td>
                            <td width="20%">{topicDetails.isEvaluate}</td>
                            <td className='text-center' width="20%">
                                <button type="button" className="btn btn-sm btn-rounded btn-danger m-2" onClick={()=>{
                                    authAxios.put(`/add-evaluate/${topicDetails._id}`, {isEvaluate : true },(req,res)=>{
                                        console.log("Evaluated")
                                    })
                                }}>Evaluate</button>
                            </td>
                        </tr>
                    )
                    ):null
                }
            </tbody>
            </table>
        </div>
        </>
    )
    }
}
export default Group