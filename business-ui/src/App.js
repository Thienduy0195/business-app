import Login from './components/admin/Login';
import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './components/context/AuthContext'
import Navbar from './components/commons/navbar/Navbar';
import ForgotPassword from './components/admin/ForgotPassword';
import ResetPassword from './components/admin/ResetPassword';
import ProductList from './components/pages/products/product-list/ProductList';
import './App.css'

function App() {
  return (
    <AuthProvider>

      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path='/login' element={<Login />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/reset-password' element={<ResetPassword />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App;
