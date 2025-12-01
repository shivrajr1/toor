import React, { useState , useEffect ,useContext} from 'react'
import axios from 'axios'
import List from '../components/List'
import './Home.css'
import { toast } from 'react-toastify';
import { context } from '../Context_API';

export default function Home() {
  
  const {search }=useContext(context)
  const [info,setInfo]=useState([]);
  const f_info=async()=>{
    await axios
       .get(`${import.meta.env.VITE_URL}/list`,{withCredentials:true})
       .then((res) => {
        if(!res.data.user){localStorage.removeItem('user')}
        setInfo(res.data.allLists)
        
       })
       .catch((err) => {
        localStorage.removeItem('user')
          toast.error("somethig went wrong")
       });
       
  }
  useEffect(() => {
    f_info();
    
 }, []);
  return (<>

    <div className='home_container'>
        {info && info.filter((e)=>e.title.includes(search.trim())).map((list,idx)=>{
          return(
              <List key={idx} list={list} />
            )
        })}
      
    </div>
    </>
  )
}
