import { Route, BrowserRouter, Routes } from 'react-router-dom'
import './App.css'
import LoginPage from './pages/Login/LoginPage'
import HomePage from './pages/Home/HomePage'
import RegisterPage from './pages/Register/RegisterPage'

function App() {
  const token = localStorage.getItem("token")
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signUp" element={<RegisterPage />} />
        <Route path='/' element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
