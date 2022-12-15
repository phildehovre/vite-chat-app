import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { QueryClientProvider } from './utils/db'
import HomePage from './pages/HomePage'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import NavBar from './components/NavBar'

function App() {
  const [count, setCount] = useState(0)



  return (
    <div className="App">
      <QueryClientProvider>
        <Router >
          <NavBar />
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/signup' element={<SignUpPage />} />
            <Route path='/login' element={<LoginPage />} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </div>
  )
}

export default App
