import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '../pages/Admin/Dashboard';
import HomeLayout from './HomeLayout';
import Employees from '../pages/Admin/Employees';

export default function AdminLayout() {
  return (
    <>
      <Routes>
        <Route path='/' element={<HomeLayout />}>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/employees' element={<Employees />} />
          <Route path='/projects' element={<Dashboard />} />
          <Route path='/tasks' element={<Dashboard />} />
          <Route path='/settings' element={<Dashboard />} />
        </Route>
      </Routes>
    </>
  );
}
