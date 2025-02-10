import React, { useState ,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Button from '../components/Button'
import './NewList.css'
import { toast } from 'react-toastify'

export default function NewList() {
  useEffect(()=>{
  },[])
  let navigate = useNavigate();
  const [info, setInfo] = useState({
    title: '',
    img: '',
    price: '',
    address: '',
    owner: localStorage.getItem("user"),
  });
  let list = async (e) => {
    e.preventDefault();
    if(info.title.trim().length===0||info.price.trim().length===0||info.address.trim().length===0){return toast.error("Enter all details")}
    await axios.post(`${import.meta.env.VITE_URL}/list/new`, info, { withCredentials: true ,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((res) => {
        toast.success("new list created successfully")
        navigate('/')
      }).catch((e) => {
        console.log(e)
        toast.error("something went wrong")
      })
  }
  function onchng(e) {
    setInfo((preinfo) => {
      preinfo[e.target.name] = e.target.value;
      return { ...preinfo };
    })
  }
  return (
    <div className='newList_container'>
    <div className='newList_container_main'>
      <h1>New List</h1>
      <form onSubmit={list} className='formpage'>
        <div className="inpt">
          <input type="text" name='title'
            onChange={onchng}
            value={info.title}
            placeholder='title'
            /></div>
        <div className="inpt">
          <input type="file" name='img'
            onChange={(e)=>{
              setInfo((preinfo) => {
                preinfo['img']=e.target.files[0];
                return { ...preinfo };
    })
            }}
            placeholder='image'
            required
            /></div>
        <div className="inpt">
          <input type="number" name='price'
            onChange={onchng}
            value={info.price}
            placeholder='pirce'
            /></div>
        <div className="inpt">
          <input type="text" name='address'
            onChange={onchng}
            value={info.address}
            placeholder='address'
            /></div>
        <Button btnName='submit' />
      </form>
      </div>
    </div>
  )
}
