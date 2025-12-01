import React, { useContext, useState } from 'react'
import {useNavigate ,Link} from 'react-router-dom'
import axios from 'axios';
import Button from '../components/Button'
import {  toast } from 'react-toastify';
import './Signup.css'
import { context } from '../Context_API';
export default function Signup() {

  const {setUser}=useContext(context)
  let navigate=useNavigate();
  const[info,setInfo]=useState({username:"",email:"",password:""});
  const submit=async(e)=>{
    e.preventDefault();
    if(info.username.trim()===''||info.email.trim()===''||info.password.trim()===''){
      return toast.error("Enter Input values");
    }
    await axios.post(`${import.meta.env.VITE_URL}/signup`,info,{withCredentials:true})
    .then((res)=>{
      if(res.data=='failed registration'){return toast.error("username already registered")}
      toast.success("welcome to wonderlust");
      navigate('/');
      setUser({...res.data})
      localStorage.setItem('id',res.data.id)
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
    <div className="signup_container">
      <h1>sign up</h1>
      <form onSubmit={submit}>
      <div className='inpt'>
        <input type="text" 
        name='username'
        placeholder='username'
        value={info.username} 
        onChange={forChange}
        />
        </div>
        <div className='inpt'>
        <input type="email"
        name='email'
        placeholder='email'
        value={info.email}
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
      <Button btnName='Signup'/>
      </form>
      <p>already have account <Link to={'/login'} className='link'>login</Link></p>
    </div>
  )
}
