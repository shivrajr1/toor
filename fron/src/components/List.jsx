import React from 'react'
import { Link } from 'react-router-dom'
import './List.css'

export default function List({list}) {
  return (
    <Link to={`/${list._id}` }className='alllink'>
      <div className='allcard' >
      <img src={list.img.url}/>
      <p><b>Title -</b> {list.title}</p>
      <p><b>Price -</b> &#8377; {list.price.toLocaleString("en-In")}</p>
      </div>
     </Link>
  )
}
