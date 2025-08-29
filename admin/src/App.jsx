import React, { useContext } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Add from './pages/Add.jsx';
import Lists from './pages/Lists.jsx';
import Orders from './pages/Orders.jsx';
import Login from './pages/Login.jsx';
import { adminDataContext } from './context/AdminContext.jsx';
import { ToastContainer } from 'react-toastify';
import AdminNavbar from './components/AdminNavbar.jsx';

const App = () => {
  const { adminData } = useContext(adminDataContext);
  const location = useLocation();
  const hideNavbar = location.pathname === '/login' || location.pathname === '/signup';

  if (!adminData) {
    return <Login />;
  }

  return (
    <>
      <ToastContainer />
      {!hideNavbar && <AdminNavbar />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/admin/add-items' element={<Add />} />
        <Route path='/admin/list-items' element={<Lists />} />
        <Route path='/admin/orders' element={<Orders />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </>
  );
};

export default App;
