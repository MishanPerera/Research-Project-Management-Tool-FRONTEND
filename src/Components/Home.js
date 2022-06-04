import React, { useEffect, useState} from 'react'
import axios from 'axios';
import Navbar from './Navbar'

export default function Home() {
  const accessToken = sessionStorage.getItem('userToken');
  const [values,setValues]=useState({});

  const authAxios = axios.create({
        baseURL: 'http://localhost:4000',
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
  })

  const date = new Date();

  const getTime =()=>{
    const hour = date.getHours()>12 ? date.getHours()%12 : date.getHours();
    const period = date.getHours()>12 ? "PM" : "AM";
    const minutes = date.getMinutes()<10? 0+""+date.getMinutes(): date.getMinutes();

    return hour+":"+minutes+" "+period;
  }
  useEffect(()=>{
    authAxios.get('/user').then(res=>{
        setValues(res.data);
    })
  },[])
  return (
    <>
    <Navbar/>
    <section class="text-center">
      <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="card mx-4 mx-md-5 align-items-center shadow-5-strong h-50 w-50">
              <h1>User Details</h1>
              <hr/>
              <h4>Email: {values.email}</h4>
              <h4>Role: {String(values.role).charAt(0).toUpperCase().concat(String(values.role).slice(1))}</h4>
              <h4>Login Status: True</h4>
              <h4>Date: {date.getDate()+"/"+date.getMonth()+"/"+date.getFullYear()}</h4>
              <h4>Time: {getTime()}</h4>
          </div>
      </div>
    </section>
  </>
  )
}
