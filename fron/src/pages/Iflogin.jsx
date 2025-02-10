import React from 'react'
import { Outlet ,Navigate} from 'react-router-dom'

export default function Iflogin() {
    
  return (
    localStorage.getItem('user')?<Navigate to='/'/>:<Outlet/>
  )
}
