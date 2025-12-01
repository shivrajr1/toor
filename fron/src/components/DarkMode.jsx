import React from 'react'
import { useState } from 'react'

export default function DarkMode() {
    const [dark,setDark]=useState(false)
    const darkFunc=()=>{
        let bool=dark
        if(bool){
            document.body.classList.remove('dark')
        }else{
            document.body.classList.add('dark')
        }
        setDark(!bool)
    }
  return (
    <button 
    onClick={()=>darkFunc()}
    style={{width:"50px",height:'30px',font:'14px',padding:'5px',margin:'5px'}}
    >{dark ? "Light":"Dark"}</button>
  )
}
