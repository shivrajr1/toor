import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Button from '../components/Button';
import {  toast } from 'react-toastify';
import './Showreview.css'

export default function Showreview({listId,reviews}) {

  const userId=localStorage.getItem("user")
  const[reviewArray,setArray]=useState(reviews)

  const dlete_review=async (reviewId)=>{
    axios.delete(`${import.meta.env.VITE_URL}/list/${listId}/review/${reviewId}`,{withCredentials:true})
    .then(()=>{toast.success("rewiew deleted")})
    .catch((err)=>{
      toast.error("something went wrong")
    })
    setArray((preinfo)=>{
      return preinfo.filter((obj)=>{
        return obj._id!=reviewId;
      })
    })
    
  }
  useEffect(()=>{
    setArray(reviews);
  },[reviews])
  return (
    <>
      <h2 key={'reviewtitle'}>All Reviews</h2>
      <div key='reviews' className="reviews">
        {reviewArray && reviewArray.map((rvw, idx) => {
          return (
          <div key={idx} className="review">
            <div key='review'>{rvw.comment}</div>
            {
            (userId == reviewArray[idx].owner) 
            && 
            <span key='delete' onClick={()=>{dlete_review(rvw._id)}}>
            <Button btnName='Delete'   />
              </span>
            }
          </div>
          )
        })}
      </div>
    </>
  )
}
