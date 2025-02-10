import { useState, useEffect } from "react";
import React from 'react'
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import Button from '../components/Button';
import Addreview from '../components/Addreview';
import Showreview from '../components/Showreview';
import {  toast } from 'react-toastify';
import './ShowList.css'

export default function ShowList() {
  const userId = localStorage.getItem("user")
  let navigate = useNavigate();
  let { id } = useParams();
  const [info, setInfo] = useState({});


  const dlete_list = async () => {
    axios.delete(`${import.meta.env.VITE_URL}/list/${id}`, { withCredentials: true })
      .then((res) => {
        
        navigate('/');
        toast.success('list deleted successfully');
      })
      .catch((err) => {
        console.log(err);
      })
  }
  const f_info = async () => {
    await axios
      .get(`${import.meta.env.VITE_URL}/list/${id}`, { withCredentials: true })
      .then((res) => {
        setInfo((preinfo) => {
          preinfo = res.data;
          return { ...preinfo }
        })
      })
      .catch((err) => {
        navigate('*');
        toast.error('something went wrong');
      });
  }
  useEffect(() => {
    f_info();

  }, []);
  return (
    <div className="show_container" >
      {info.img&&<div className="card" key='card'>
        <img src={info.img.url} alt="list image" className="image" key='image' />
        <p key='para' className="para">
         by <i>{info.owner.username}</i>
        <li><b> Title - </b>{info.title}</li>
        <li><b>Price - </b>&#8377; {info.price.toLocaleString("en-In")}/night</li>
        <li><b>Address - </b>{info.address}</li>
          </p>
        <div key='btns' className="btns">
          {(userId == info.owner._id) && <>
            <Link to={`/${id}/edit`}><Button btnName='Edit' key='link' /></Link>
            <span className='dlt' key='dlt' onClick={dlete_list}>
              <Button  btnName='Delete' />
            </span>
          </>}
        </div>
      </div>}
      <div key='comment' className="comment">

        <Addreview f_info={f_info} listId={id} />
        <hr />
        {info.reviews && <Showreview listId={id} reviews={info.reviews} />}
      </div>
    </div>
  )
}
