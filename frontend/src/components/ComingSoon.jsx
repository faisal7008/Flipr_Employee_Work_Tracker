import React from 'react';
import { useLocation } from 'react-router-dom';
import comingSoon from '../assets/comingsoon.svg'

export default function ComingSoon() {
    const currentPath = useLocation();
    const userType = currentPath.pathname.split('/')[1]
    const page = currentPath.pathname.split('/')[2]
  return (
    <div className='p-2 h-full flex flex-col'>
      <div className='text-sm capitalize breadcrumbs'>
        <ul>
          <li>
            <a>{userType}</a>
          </li>
          <li>
            <a>{page}</a>
          </li>
        </ul>
      </div>
      <h2 className=' text-2xl font-semibold capitalize tracking-wide'>{page}</h2>
      <div className=' grow flex flex-col gap-4 justify-center items-center'>
        <img width={450} src={comingSoon} />
        <h2 className=' font-semibold text-2xl tracking-wide'>Coming Soon</h2>
      </div>
    </div>
  );
}
