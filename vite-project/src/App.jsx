import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Lobby from './pages/Lobby'
import Navbar from './components/Navbar'
import Room from './pages/Room'
import "./App.css";
import CreateMeeting from './pages/CreateMeeting'
import JoinMeeting from './pages/JoinMeeting'

export default function App()  {
  return (
    <>
      <Navbar/> 
      <Routes>
        <Route exact path='/' element={<Lobby/>}/>
        <Route path="/room/:roomId" element={<Room/>} />
        <Route exact path='/createmeet' element={<CreateMeeting/>}/>
        <Route path="/joinmeet" element={<JoinMeeting/>} />
      </Routes>
    </>
  )
}