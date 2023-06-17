import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '../pages/Employee/Dashboard';
import HomeLayout from './HomeLayout';
import Profile from '../pages/Profile';
import Tasks from '../pages/Employee/Tasks';

export default function EmployeeLayout() {
  return (
    <Routes>
      <Route path='/' element={<HomeLayout />}>
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/tasks' element={<Tasks />} />
        <Route path='/projects' element={<Dashboard />} />
        <Route path='/settings' element={<Dashboard />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='*' element={<Navigate to={'/'} />} />
      </Route>
    </Routes>
  );
}
