import Login from './components/admin/Login';
import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './components/context/AuthContext'
import Navbar from './components/commons/Navbar';

function App() {
  return (
    <AuthProvider>

      <Router>
        <Navbar />
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App;
