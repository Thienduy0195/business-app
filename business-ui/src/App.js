import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./components/context/AuthContext";
import Navbar from "./components/commons/navbar/Navbar";
import Login from "./components/authen/login/Login";
import ForgotPassword from "./components/authen/forgot-password/ForgotPassword";
import ResetPassword from "./components/authen/reset-password/ResetPassword";
import ProductList from "./components/pages/products/product-list/ProductList";
import AddNewProduct from "./components/admin/product-management/add-new-product/AddNewProduct";
import ProductListAdmin from "./components/admin/product-management/product-list-admin/ProductListAdmin";
import "./App.css";
import UpdateProduct from "./components/admin/product-management/update-product/UpdateProduct";
import { ToastContainer, toast } from "react-toastify";
import SignUp from "./components/authen/sign-up/SignUp";
const toastConfig = {
  position: toast.POSITION.TOP_CENTER,
  autoClose: 3000,
};
function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/add-new" element={<AddNewProduct />} />
          <Route path="/admin/products" element={<ProductListAdmin />} />
          <Route path="/edit/:itemId" element={<UpdateProduct />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
      <ToastContainer {...toastConfig} />
    </AuthProvider>
  );
}

export default App;
