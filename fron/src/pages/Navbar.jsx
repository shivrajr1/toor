import {React ,useContext,useState } from 'react'
import './Navbar.css'
import { Link ,useNavigate} from 'react-router-dom'
import axios from 'axios';
import MenuIcon from '@mui/icons-material/Menu';
import DarkMode from '../components/DarkMode';
import { context } from '../Context_API';
export default function Navbar() {

  const {search, setSearch, setUser ,user}=useContext(context)
  const navigate=useNavigate()

  const dlt=async()=>{
    await axios.delete(`${import.meta.env.VITE_URL}/logout`,{withCredentials: true})
    .then((res)=>{ 
      navigate('/login')
      setUser({})
      localStorage.removeItem('id')
    })
    .catch((err)=>{
      console.log(err)
    })
  }
  
  const menu=()=>{
    let icon=document.getElementById('inmenuone');
    if(icon.className=='inmenuone'){
      icon.className='inmenusecond'
    }else{icon.className='inmenuone'}
    let timer=setTimeout(()=>{
      if(icon.className=='inmenusecond'){
        icon.className='inmenuone'
      }
    },2000)
    return ()=>clearTimeout(timer);
  }
  
  return (
    <div className='nav_container'>
      <b>
      <div className="forleft" id='leftone'>
        <span className='icon'onClick={menu}id='span'>
      <MenuIcon style={{color:"#fff", fontSize:"30px",margin:"10px"}}/></span>
      <span className='inmenuone'id='inmenuone'>
      <Link className='nav_link home' to={'/'}>Home</Link>
      <Link className='nav_link newlist' to={'/new'}>New</Link>
      <Link className='nav_link 'to={'/about'}>About</Link>
      <Link className='nav_link 'to={'/contact'}>Contact</Link>
      </span>
      </div>
      </b>
      <b>
      <div className="forright">
      <input 
      type='text' 
      placeholder='search'
      value={search}
      onChange={e=>setSearch(e.target.value)}
      style={{width:'60px',margin:'5px',borderRadius:"20px",padding:'5px 5px'}}/>
      <DarkMode/>
      {!user?.id&&
      <>
      <Link className='nav_link signup sll' to={'/signup'}>Signup</Link>
      <Link className='nav_link login sll'to={'/login'}>Login</Link>
      </>
      }
    {user?.id&&<Link to={"/"}onClick={dlt} className='nav_link logout sll'>Logout</Link>}
      </div>
      </b>
    </div>
  )
}
