import {React  } from 'react'
import './Navbar.css'
import { Link ,useNavigate} from 'react-router-dom'
import axios from 'axios';
import MenuIcon from '@mui/icons-material/Menu';
export default function Navbar() {
  const navigate=useNavigate()
  const userId=localStorage.getItem('user');
  const dlt=async()=>{
    await axios.delete(`${import.meta.env.VITE_URL}/logout`,{withCredentials: true})
    .then((res)=>{ 
      navigate('/login')
      localStorage.removeItem('user');
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
      {!userId&&
      <>
      <Link className='nav_link signup sll' to={'/signup'}>Signup</Link>
      <Link className='nav_link login sll'to={'/login'}>Login</Link>
      </>
      }
    {userId&&<Link to={"/"}onClick={dlt} className='nav_link logout sll'>Logout</Link>}
      </div>
      </b>
    </div>
  )
}
