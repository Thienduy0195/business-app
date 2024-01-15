
import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './components/context/AuthContext'
import Navbar from './components/commons/navbar/Navbar';
import Login from './components/admin/authen/login/Login';
import ForgotPassword from './components/admin/authen/forgot-password/ForgotPassword';
import ResetPassword from './components/admin/authen/reset-password/ResetPassword';
import ProductList from './components/pages/products/product-list/ProductList';
import AddNewProduct from './components/admin/product-management/add-new-product/AddNewProduct'
import ProductListAdmin from './components/admin/product-management/product-list-admin/ProductListAdmin';
import './App.css'
import UpdateProduct from './components/admin/product-management/update-product/UpdateProduct';

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
          <Route path='/new' element={<AddNewProduct />} />
          <Route path='/add' element={<ProductListAdmin />} />
          <Route path="/edit/:itemId" element={<UpdateProduct/>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App;
