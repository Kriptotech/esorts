import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from '../components/Header'
import BottomTab from '../components/BottomTab'
import Home from '../pages/Home'
import Detail from '../pages/Detail'

const Rotas = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route
          path="/detail/perfil/esort/:id"
          exact
          element={<Detail />}
        />
      </Routes>
      <BottomTab />
    </BrowserRouter>
  )
}

export default Rotas
