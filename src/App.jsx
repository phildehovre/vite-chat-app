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

function App() {
  const [count, setCount] = useState(0)




  return (
    <div className="App">
      <QueryClientProvider>
        <CreateRoomModalProvider>
          <ModalWrapper />
          <Router >
            <NavBar />
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='/room/:roomid' element={<HomePage />} />
              <Route path='/signup' element={<SignUpPage />} />
              <Route path='/login' element={<LoginPage />} />
            </Routes>
          </Router>
        </CreateRoomModalProvider>
      </QueryClientProvider>
    </div>
  )
}

export default App
