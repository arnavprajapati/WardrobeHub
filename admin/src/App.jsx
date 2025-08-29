import React, { useContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Add from './pages/Add.jsx'
import Lists from './pages/Lists.jsx'
import Orders from './pages/Orders.jsx'
import Login from './pages/Login.jsx'
import { adminDataContext } from './context/AdminContext.jsx'
import { ToastContainer, toast } from 'react-toastify';

const App = () => {
  let {adminData} = useContext(adminDataContext)
  return (
    <>
      <ToastContainer />
      {!adminData ? <Login /> : <>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/add' element={<Add />} />
          <Route path='/lists' element={<Lists />} />
          <Route path='/orders' element={<Orders />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </> }
    </>
  )
}

      export default App