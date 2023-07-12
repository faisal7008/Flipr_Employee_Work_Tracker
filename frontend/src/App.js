import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import React from 'react';
import AdminLayout from './components/AdminLayout';
import EmployeeLayout from './components/EmployeeLayout';
import Login from './pages/Login';
import { useSelector } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import NoPageFound from './components/NoPageFound';

function App() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className='App bg-slate-100'>
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route
            path='/admin/*'
            element={user && user.role === 'admin' ? <AdminLayout /> : <Navigate to={'/'} />}
          />
          <Route
            path='/employee/*'
            element={user && user.role === 'employee' ? <EmployeeLayout /> : <Navigate to={'/'} />}
          />
          <Route path='*' element={<NoPageFound />} />
        </Routes>
      </Router>
      <ToastContainer autoClose={2000} toastContainerStyle={{ width: '320px' }} />
    </div>
  );
}

export default App;
