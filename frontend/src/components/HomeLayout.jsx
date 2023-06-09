import React, { useEffect, useRef, useState } from 'react';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

export default function HomeLayout() {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  return (
    <div className='h-screen flex'>
      <aside
        ref={sidebarRef}
        className={`fixed lg:hidden inset-y-0 left-0 z-[1500] w-64 bg-slate-900 shadow-lg transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        id='mobile-nav'
      >
        <button
          className='h-10 w-6 lg:hidden bg-white absolute right-0 mt-16 -mr-6 flex items-center shadow-lg rounded-tr rounded-br justify-center cursor-pointer'
          id='mobile-toggler'
          onClick={() => setIsOpen((flag) => !flag)}
        >
          {' '}
          {isOpen ? (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={2}
              stroke='currentColor'
              className='w-6 h-6'
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
            </svg>
          ) : (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={2}
              stroke='currentColor'
              className='w-6 h-6'
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
            </svg>
          )}
        </button>
        <Sidebar />
      </aside>
      <aside className='w-72 h-screen hidden lg:block box-border'>
        <Sidebar />
      </aside>
      <main className='w-full h-screen box-border py-3 px-6'>
        {/* <h2 className=" absolute right-10 top-10">Hello</h2> */}
        <Outlet />
      </main>
    </div>
  );
}
