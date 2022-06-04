import React, {useState, useEffect} from 'react'
import { Grow, Dialog, DialogActions, DialogContent, DialogTitle, Divider } from '@mui/material';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Navbar from './Navbar';
import axios from 'axios'

function Student() {
    const accessToken = sessionStorage.getItem('userToken');
    const role = sessionStorage.getItem("userRole");
    let docType = {
        word: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        presentation: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        pdf : "application/pdf"
    };

    const authAxios = axios.create({
        baseURL: 'http://localhost:4000',
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    })

    const [filename, setFilename] = useState();
    const [file, setFile] = useState();
    const [values,setValues]=useState([]);

    const [isAdd,setIsAdd]=useState(false);
    const handleAddOpen=()=> setIsAdd(true);
    const handleAddClose=()=> setIsAdd(false);

    const [isDelete,setIsDelete]=useState(false);
    const handleDeleteOpen=()=> setIsDelete(true);
    const handleDeleteClose=()=> setIsDelete(false);

    const [isDownload,setIsDownload]=useState(false);
    const handleDownloadOpen=()=> setIsDownload(true);
    const handleDownloadClose=()=> setIsDownload(false);

    const handleSubmit = (event) =>{
        event.preventDefault();
        
        let formData = new FormData();
        formData.append("file", file);

        // Used for Testing Purpose
        // axios.post("https://httpbin.org/anything",formData).then(res=>{
        //   console.log(res)
        // }).catch(e=>{
        //   console.log(e)
        // })
        authAxios.post('/student-upload',formData).then(res=>{
            authAxios.get('/student-files').then(res=>{
            setValues(res.data)
            handleAddClose()
            toast.success("Document Added",{
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
            })
        })
    })
    }

    const handleDocType = (heading, key) => {
        let docCount = 0
        return(
            <>
            <div className="card align-items-center table-responsive pb-2">
            <h5 className='text-center'>{heading}</h5>
            <table className="table table-dark table-bordered">
            <thead className="bg-light">
                <tr>
                    <th>No</th>
                    <th>Name</th>
                    <th>Date</th>
                    <th className='text-center'>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    values ? values.filter((val)=>{
                        if(val.contentType.toLowerCase().includes(docType[key])) return val
                        }).map(values=> (
                        <tr key={values._id} className='table-light'>
                            <td width="10%">{++docCount}</td>
                            <td width="50%">{values.filename.split('+')[1].split('.')[0]}</td>
                            <td width="20%">{values.uploadDate.split('T')[0]} {values.uploadDate.split('T')[1].split('.')[0]}</td>
                            <td className='text-center' width="20%">
                                {role === 'student'?
                                    <button type="button" className="btn btn-sm btn-rounded btn-danger m-2" onClick={()=>{
                                        setFilename(values.filename);
                                        handleDeleteOpen()
                                    }}>Delete</button>
                                :null
                                }
                                <button type="button" className="btn btn-sm btn-rounded btn-success m-2" onClick={()=>{
                                    setFilename(values.filename);
                                    handleDownloadOpen()
                                }}>Download</button>
                            </td>
                        </tr>
                    )
                    ):null
                }
            </tbody>
            </table>
        </div>
        {handleDownload()}
        {handleDelete()}
        </>
        )
    }

    const handleFileData = ()=> {
        return(
            <Grow in={isAdd} {...(isAdd ? { timeout: 500 } : {})}>
            <Dialog open={isAdd} onClose={handleAddClose} keepMounted maxWidth={'md'} aria-labelledby="responsive-dialog-title">
                <DialogTitle id="responsive-dialog-title">
                    Are You Sure to Add Document?
                <Divider/>
                </DialogTitle>
                <DialogContent>
                <form>
                <div className="form-group mb-3">
                    <label htmlFor="file" className="custom-file-label">
                        <h6>File</h6>
                    </label>
                    <div className="custom-file">
                        <input type="file" name="file" accept='.docx,.pdf,.pptx' className="custom-file-input form-control" id="file"
                        aria-describedby="inputGroupFile" onChange={e=>{
                        const file = e.target.files[0];
                        setFile(file)
                        }}/>
                    </div>
                </div>
                </form>
                </DialogContent>
                <DialogActions>
                    <div>
                        <input type='submit' className='btn btn-success m-2' onClick={handleSubmit} value='Yes, Add Document!'/>
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
                            authAxios.delete(`/student-files/${filename}`).then(res=>{
                                toast.success("Delete Successfull",{
                                        position: "top-center",
                                        autoClose: 1000,
                                        hideProgressBar: true,
                                        closeOnClick: true,
                                        pauseOnHover: true,
                                        draggable: false,
                                        progress: undefined,
                                    })
                                authAxios.get('/student-files').then(res=>{
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

    const handleDownload = () =>{
        return(
            <Grow in={isDownload} {...(isDownload ? { timeout: 500 } : {})}>
            <Dialog open={isDownload} onClose={handleDownloadClose} keepMounted maxWidth={'md'} aria-labelledby="responsive-dialog-title">
                <DialogTitle id="responsive-dialog-title">
                    Are You Sure to Download?
                <Divider/>
                </DialogTitle>
                <DialogActions>
                    <div>
                        <input type='submit' className='btn btn-success m-2' onClick={()=>{
                            authAxios.get(`/student-files/${filename}`).then(res=>{
                                if(res){
                                    toast.success("Download Successfull",{
                                        position: "top-center",
                                        autoClose: 1000,
                                        hideProgressBar: true,
                                        closeOnClick: true,
                                        pauseOnHover: true,
                                        draggable: false,
                                        progress: undefined,
                                    })
                                }
                            })
                            handleDownloadClose()
                        }} value='Yes'/>
                        <input type='reset' className='btn btn-primary m-2' onClick={handleDownloadClose} value='NO'/>
                    </div>
                </DialogActions>
            </Dialog>
            </Grow>
        )
    }

    useEffect(()=>{
        authAxios.get('/student-files').then(res=>{
            setValues(res.data)
        })
    },[])

    if(role === 'student'){
        return (
        <>
        <Navbar/>
        <br/>
        <ToastContainer/>
        <div className="row justify-content-between">
            <div className="col-4 m-2">
                <h3 className='text-start title'>Documents</h3>
            </div>
        <div className="col-4 text-end m-2">
            <button type="button" className="btn btn-sm btn-rounded btn-success" onClick={handleAddOpen}>Add</button>
        </div>
        </div>
        <br/>
        <div className="row d-flex justify-content-center">
            {handleDocType("Word Template","word")}
            {handleDocType("Presentation Template","presentation")}
            {handleDocType("Marking Scheme","pdf")}
        </div>
        <br/>
        {handleFileData()}
        </>
    )
    }
    else {
        return (
                <>
                <Navbar/>
                <br/>
                <ToastContainer/>
                <div className="row justify-content-between">
                    <div className="col-4 m-2">
                        <h3 className='text-start title'>Documents</h3>
                    </div>
                </div>
                <br/>
                <div className="row d-flex justify-content-center">
                    {handleDocType("Word Template","word")}
                    {handleDocType("Presentation Template","presentation")}
                    {handleDocType("Marking Scheme","pdf")}
                </div>
                <br/>
                {handleFileData()}
                </>
        )
    }
}

export default Student