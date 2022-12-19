import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { QueryClientProvider } from './utils/db'
import HomePage from './pages/HomePage'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import NavBar from './components/NavBar'
import Modal from './components/Modal'
import CreateRoomModalProvider from './contexts/CreateRoomModal'
import ModalWrapper from './pages/ModalWrapper'
import RoomContextProvider, { RoomContext } from './contexts/RoomContext'
import RoomSettingsPage from './pages/RoomSettingsPage'

function App() {

  return (
    <div className="App">
      <QueryClientProvider>
        <RoomContextProvider>
          <CreateRoomModalProvider>
            <ModalWrapper />
            <Router >
              <NavBar />
              <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/room/:roomid' element={<HomePage />} />
                <Route path='/signup' element={<SignUpPage />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/roomsettings/:roomid' element={<RoomSettingsPage />} />
              </Routes>
            </Router>
          </CreateRoomModalProvider>
        </RoomContextProvider>
      </QueryClientProvider>
    </div>
  )
}

export default App
