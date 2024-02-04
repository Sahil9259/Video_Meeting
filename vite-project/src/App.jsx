import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Lobby from './pages/Lobby'
import Navbar from './components/Navbar'
import Room from './pages/Room'
import "./App.css";
// import Footer from './components/Footer'

export default function App()  {
  return (
    <>
      <Navbar/> 
      <Routes>
        <Route exact path='/' element={<Lobby/>}/>
        <Route path="/room/:roomId" element={<Room/>} />
      </Routes>
      {/* <Footer/> */}
    </>
  )
}