import React from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import SignUpPage from './pages/SignUpPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import { ToastContainer } from 'react-toastify';
import Navbar from './components/Navbar.jsx';
import About from './pages/About.jsx';
import Collections from './pages/Collections.jsx';
import Contact from './pages/Contact.jsx';
import Product from './pages/Product.jsx';
import ProtectedRoute from './utils/ProtectedRoutes.jsx'; 

const App = () => {
  const location = useLocation();
  const hideNavbar = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <>
      <ToastContainer />
      {!hideNavbar && <Navbar />}

      <Routes>
        <Route
          path='/login'
          element={<LoginPage />}
        />
        <Route
          path='/signup'
          element={<SignUpPage />}
        />

        <Route
          path='/'
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path='/about'
          element={
            <ProtectedRoute>
              <About />
            </ProtectedRoute>
          }
        />
        <Route
          path='/collection'
          element={
            <ProtectedRoute>
              <Collections />
            </ProtectedRoute>
          }
        />
        <Route
          path='/contact'
          element={
            <ProtectedRoute>
              <Contact />
            </ProtectedRoute>
          }
        />
        <Route
          path='/product'
          element={
            <ProtectedRoute>
              <Product />
            </ProtectedRoute>
          }
        />
      </Routes>

    </>
  );
}

export default App;
