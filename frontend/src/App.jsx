import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import SignUpPage from './pages/SignUpPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import { ToastContainer } from 'react-toastify'
import Navbar from './components/Navbar.jsx'
import { userDataContext } from './context/UserContext.jsx'

const App = () => {
  const { userData } = React.useContext(userDataContext)
  return (
    <>
      <ToastContainer />
      { userData && <Navbar /> }
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<SignUpPage />} />
        <Route path='/login' element={<LoginPage />} />
      </Routes>
    </>
  )
}

export default App