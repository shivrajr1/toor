import React, { useContext } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Button from '../components/Button'
import axios from 'axios'
import './UpdateList.css'
import { toast } from 'react-toastify';
import { context } from '../Context_API';


export default function UpdateList() {

  const { user, setLoading } = useContext(context)
  let navigate = useNavigate();
  let { id } = useParams();
  const [imageurl, setImageurl] = useState('')
  const [placeholdr, setPlaceholdr] = useState({});
  const [info, setInfo] = useState({
    title: '',
    img: '',
    price: '',
    address: '',
    owner: user?.id,
  });

  let onchng = (e) => {
    setInfo((preinfo) => {
      preinfo[e.target.name] = e.target.value;
      return { ...info };
    })
  }


  const f_info = async () => {
    setLoading(true)
    await axios
      .get(`${import.meta.env.VITE_URL}/list/${id}/edit`, { withCredentials: true })
      .then((res) => {
        setImageurl(res.data.img.url);
        setPlaceholdr((preinfo) => {
          preinfo = res.data;
          return { ...preinfo }
        })

      })
      .catch((err) => {
        toast.error("something went wrong")
      })
      .finally(() => {
        setLoading(false)
      })
  }


  useEffect(() => {
    f_info();
  }, []);


  let list = async (e) => {
    e.preventDefault();
    if (info.title.trim().length === 0 || info.price.trim().length === 0 || info.address.trim().length === 0) { return toast.error("Enter all details") }
    await axios.put(`${import.meta.env.VITE_URL}/list/${id}`,
      {
        title: info.title,
        img: info.img,
        price: info.price,
        address: info.address,
        owner: user?.id,
      }
      , {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        toast.success("list updated successfully")
        navigate(-1);

      }).catch((e) => {
        toast.error("something went wrong")

      })
  }


  return (
    <div className='update_container'>
      <div className='update_container_main'>
        <h1>Update List</h1>
        <form onSubmit={list}>
          <div className="inpt">
            <input type="text" name='title'
              onChange={onchng}
              value={info.title}
              placeholder={placeholdr.title}
            /></div>
          <div className="inpt">

            <input type="file" name='img'
              onChange={(e) => {
                setInfo((preinfo) => {
                  preinfo['img'] = e.target.files[0];
                  return { ...preinfo };
                })
              }}
              required
            /></div>
          <img src={imageurl} style={{
            width: '200px',
            height: '100px'
          }} />
          <div className="inpt">
            <input type="number" name='price'
              onChange={onchng}
              value={info.price}
              placeholder={placeholdr.price}
            /></div>
          <div className="inpt">
            <input type="text" name='address'
              onChange={onchng}
              value={info.address}
              placeholder={placeholdr.address}
            /></div>
          <Button btnName='submit' />
        </form>
      </div>
    </div>
  )
}
