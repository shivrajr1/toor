import React, { useState } from "react";
import { Routes, Route, } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import Home from './pages/Home';
import Login from './pages/Login';
import Iflogin from './pages/Iflogin';
import NewList from './pages/NewList';
import ShowList from './pages/ShowList';
import Signup from './pages/Signup';
import UpdateList from './pages/UpdateList';
import Navbar from './pages/Navbar'
import About from './pages/About'
import Contact from './pages/Contact'
import './App.css'
import PageNotFound from "./pages/PageNotFound";
import Protectedrout from "./pages/protectedroute"
import { context } from "./Context_API";

function App() {
  
  const [user ,setUser]=useState({id:localStorage.getItem('id')})
  const [search , setSearch]=useState('')
  
  return (
    <>
    <context.Provider value={{search, setSearch, user, setUser}}>
    <Navbar/>
    <ToastContainer autoClose={2000}closeOnClick={true}position='top-center'closeButton={false}/>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route element={<Iflogin/>}>
        <Route path="/signup" element={<Signup />}/>
        <Route path="/login" element={<Login />}/>
        </Route>
        <Route path="/about" element={<About/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route element={<Protectedrout />}>

        <Route path="/new" element={<NewList />}/>
        <Route path="/:id" element={<ShowList />}/>
        <Route path="/:id/edit" element={<UpdateList/>}/>
        </Route>
        <Route path="*" element={<PageNotFound/>}/>
      </Routes>
      </context.Provider>
    </>
  )
  
 
 
}

export default App
