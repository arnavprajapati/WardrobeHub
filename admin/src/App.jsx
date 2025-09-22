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
import ClipLoader from 'react-spinners/ClipLoader';

const App = () => {
    const { adminData, loading } = useContext(adminDataContext);
    const location = useLocation();
    const hideNavbar = location.pathname === '/login' || location.pathname === '/signup';

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-white">
                <ClipLoader color="#9B59B6" size={50} />
            </div>
        );
    }

    if (!adminData) {
        return <Login />;
    }

    return (
        <>
            <ToastContainer />
            {!hideNavbar && <AdminNavbar />}
            <Routes>
                <Route path='/admin/dashboard' element={<Home />} />
                <Route path='/admin/add-items' element={<Add />} />
                <Route path='/admin/list-items' element={<Lists />} />
                <Route path='/admin/view-orders' element={<Orders />} />
                <Route path='/login' element={<Login />} />
            </Routes>
        </>
    );
};

export default App;