import React, { useState } from 'react'
import {useNavigate ,Link} from 'react-router-dom'
import axios from 'axios';
import Button from '../components/Button'
import {  toast } from 'react-toastify';
import './Login.css';
export default function Login({local}) {
  let navigate=useNavigate();
  const[info,setInfo]=useState({username:"",password:""});
  const submit=async(e)=>{
    e.preventDefault();
    if(info.username.trim()===''||info.password===''){return toast.error("input username and password")}
    await axios.post(`${import.meta.env.VITE_URL}/login`,info,{withCredentials: true})
    .then((res)=>{

      if(res.data==='login failed'){
        return toast.error("username or password incorrect")
      }
      toast.success("loged in successfully")
      navigate(-1);
      local(res.data.id)
    })
    .catch((err)=>{
      toast.error("something went wrong")
    })
  }
  const forChange=(e)=>{
    setInfo((preinfo)=>{
      preinfo[e.target.name]=e.target.value;
      return {...preinfo}
    })
  }
  
  return (
    <div className="login_container">
      <h1>login</h1>
      <form onSubmit={submit} className='formpage'>
      <div className='inpt'>
        <input type="text" 
        name='username'
        placeholder='username'
        value={info.username} 
        onChange={forChange}
        />
        </div>
      <div className='inpt'>
        <input type="password" 
        name='password'
        placeholder='password'
        value={info.password}
        onChange={forChange} 
        />
        </div>
      <Button btnName='Login'/>
      </form>
      <p>don't have account <Link to={'/signup'} className='link'>sign up</Link></p>
    </div>
  )
}
