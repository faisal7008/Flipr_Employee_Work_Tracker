import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '../pages/Admin/Dashboard';
import HomeLayout from './HomeLayout';

export default function EmployeeLayout() {
  return (
    <Routes>
      <Route path='/' element={<HomeLayout />}>
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/tasks' element={<Dashboard />} />
        <Route path='/projects' element={<Dashboard />} />
        <Route path='/settings' element={<Dashboard />} />
      </Route>
    </Routes>
  );
}
