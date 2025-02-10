
import { useState ,React} from "react";
import axios from 'axios'
import Button from './Button';
import {  toast } from 'react-toastify';
import './Addreview.css'

export default function Addreview({listId,f_info}) {
      const [review,setReview]=useState('');
    const add=async()=>{
      if(review.trim()===''){
        return toast.error("leave some review")
      }
        await axios
        .post(`${import.meta.env.VITE_URL}/list/${listId}/review`,{'comment':review},{withCredentials:true})
        .catch((err)=>{
          toast.error("something went wrong")
        })
        setReview('');
        f_info();
      }
  return (
        <>
        <h2 key={'addreview'}>Add Review</h2>
          <textarea 
          maxLength="180"
          key='textarea'
          name="review" 
          id="review" 
          onChange={(e)=>{
           
            setReview(e.target.value);
          }}
          value={review}
          required
          />
          <span key='add' onClick={add}>
          <Button  btnName='add'/></span>
          </>
  )
}
