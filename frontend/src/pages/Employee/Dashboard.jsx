import React from 'react';
import { useDispatch } from 'react-redux';

export default function Dashboard() {
  // const dispatch = useDispatch();
  return (
    <div className=''>
      <div className='text-sm breadcrumbs'>
        <ul>
          <li>
            <a>Employee</a>
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
