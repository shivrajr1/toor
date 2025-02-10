import {React } from 'react'
import { Outlet ,Navigate} from 'react-router-dom'

export default function protectedroute() {
  
  return localStorage.getItem('user') ? <Outlet/>:<Navigate to='/login'/>
}
