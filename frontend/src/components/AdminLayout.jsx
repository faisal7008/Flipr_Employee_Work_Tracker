import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '../pages/Admin/Dashboard';
import HomeLayout from './HomeLayout';
import Employees from '../pages/Admin/Employees';
import Profile from '../pages/Profile';

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
          <Route path='/profile' element={<Profile />} />
          <Route path='*' element={<Navigate to={'/'} />} />
        </Route>
      </Routes>
    </>
  );
}
