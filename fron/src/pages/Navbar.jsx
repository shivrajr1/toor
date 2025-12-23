import React, { useContext, useState } from 'react';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import MenuIcon from '@mui/icons-material/Menu';
import DarkMode from '../components/DarkMode';
import { context } from '../Context_API';

export default function Navbar() {
  const { search, setSearch, setUser, user, setLoading} = useContext(context);
  const navigate = useNavigate();

  const [openMenu, setOpenMenu] = useState(false);

  const dlt = async () => {
    setLoading(true)
    await axios
      .delete(`${import.meta.env.VITE_URL}/logout`, { withCredentials: true })
      .then(() => {
        navigate('/login');
        setUser({});
        localStorage.removeItem('id');
      })
      .catch(err => console.log(err))
      .finally(()=>{
        setLoading(false)
      })
  };

  return (
    <div className="nav_container">

      <div className="forleft">
        {/* Toggle button */}
        <span className="icon" onClick={() => setOpenMenu(!openMenu)}>
          <MenuIcon style={{ color: '#fff', fontSize: '30px' }} />
        </span>

        {/* Menu Links */}
        <span className={`menu_links ${openMenu ? 'open' : ''}`}>
          <Link className="nav_link" to="/" onClick={() => setOpenMenu(false)}>Home</Link>
          <Link className="nav_link" to="/new" onClick={() => setOpenMenu(false)}>New</Link>
          <Link className="nav_link" to="/about" onClick={() => setOpenMenu(false)}>About</Link>
          <Link className="nav_link" to="/contact" onClick={() => setOpenMenu(false)}>Contact</Link>
        </span>
      </div>

      <div className="forright">
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="search_input"
        />

        <DarkMode />

        {!user?.id && (
          <>
            <Link className="nav_link sll" to="/signup">Signup</Link>
            <Link className="nav_link sll" to="/login">Login</Link>
          </>
        )}

        {user?.id && (
          <Link className="nav_link logout sll" to="/" onClick={()=>dlt()}>
            Logout
          </Link>
        )}
      </div>

    </div>
  );
}
