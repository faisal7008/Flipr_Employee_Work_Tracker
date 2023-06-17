import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '../pages/Admin/Dashboard';
import HomeLayout from './HomeLayout';
import Employees from '../pages/Admin/Employees';
import Profile from '../pages/Profile';
import ComingSoon from './ComingSoon';

export default function AdminLayout() {
  return (
    <>
      <Routes>
        <Route path='/' element={<HomeLayout />}>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/employees' element={<Employees />} />
          <Route path='/projects' element={<ComingSoon />} />
          <Route path='/tasks' element={<ComingSoon />} />
          <Route path='/settings' element={<ComingSoon />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='*' element={<Navigate to={'/'} />} />
        </Route>
      </Routes>
    </>
  );
}
