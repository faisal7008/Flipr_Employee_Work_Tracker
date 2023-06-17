import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../features/auth/authSlice';

export default function Dashboard() {
  const dispatch = useDispatch();
  return (
    <div className='p-2'>
      <div className='text-sm breadcrumbs'>
        <ul>
          <li>
            <a>Admin</a>
          </li>
          <li>
            <a>Dashboard</a>
          </li>
        </ul>
      </div>
      <h2 className=' text-2xl font-semibold tracking-wide'>Dashboard</h2>
    </div>
  );
}
