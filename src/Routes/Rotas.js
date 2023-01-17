import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from '../components/Header'
import BottomTab from '../components/BottomTab'
import Home from '../pages/Home'
import Detail from '../pages/Detail'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import Profile from '../pages/Profile'

const Rotas = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Rotas
