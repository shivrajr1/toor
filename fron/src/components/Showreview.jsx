import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import Button from '../components/Button';
import { toast } from 'react-toastify';
import './Showreview.css'
import { context } from '../Context_API'

export default function Showreview({ listId, reviews }) {
  const { user, setLoading } = useContext(context)
  const [reviewArray, setArray] = useState(reviews)


  const dlete_review = async (reviewId) => {
    setLoading(true)
    axios.delete(`${import.meta.env.VITE_URL}/list/${listId}/review/${reviewId}`, { withCredentials: true })
      .then(() => { toast.success("rewiew deleted") })
      .catch((err) => {
        toast.error("something went wrong")
      })
      .finally(() => {
        setLoading(false)
      })
    setArray((preinfo) => {
      return preinfo.filter((obj) => {
        return obj._id != reviewId;
      })
    })

  }

  useEffect(() => {
    setArray(reviews);
  }, [reviews])


  return (
    <>
      <h2 key={'reviewtitle'}>All Reviews</h2>
      <div key='reviews' className="reviews">
        {reviewArray && reviewArray.map((rvw, idx) => {
          return (
            <div key={idx} className="review">
              <div key='review'>{rvw.comment}</div>
              {
                (user?.id == reviewArray[idx].owner)
                &&
                <span key='delete' onClick={() => { dlete_review(rvw._id) }}>
                  <Button btnName='Delete' />
                </span>
              }
            </div>
          )
        })}
      </div>
    </>
  )
}
