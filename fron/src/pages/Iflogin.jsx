import React, { useContext } from 'react'
import { Outlet ,Navigate} from 'react-router-dom'
import { context } from '../Context_API'

export default function Iflogin() {
    const {user}=useContext(context)
  return (
    user?.id?<Navigate to='/'/>:<Outlet/>
  )
}
