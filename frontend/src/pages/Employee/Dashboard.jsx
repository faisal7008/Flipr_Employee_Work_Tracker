import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import StackedBarChart from '../../utils/charts/StackedBarChart';
import PieCharts from '../../utils/charts/PieCharts';
import { getTasksByEmployee } from '../../features/task/taskSlice';

export default function Dashboard() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { tasks } = useSelector((state) => state.task);
  useEffect(() => {
    dispatch(getTasksByEmployee({ employeeId: user._id }));
  }, []);
  return (
    <div className='flex p-2 flex-col h-full scroll-container overflow-y-auto'>
      <div className='text-sm breadcrumbs overflow-visible'>
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
      <div className=' flex flex-col gap-4 h-full w-full'>
        <div className='grid md:grid-cols-4 gap-5 py-3 w-full md:h-32'>
          <div className='card bg-base-100 shadow-lg'>
            <div className='px-5 py-4 grid gap-2'>
              <div>
                <h2 className=' font-semibold text-slate-500'>Total Hours</h2>
                <div className='icon'></div>
              </div>
              <div className=' flex justify-between items-end'>
                <h2 className=' text-3xl font-semibold'>
                  03:30 <sup className=' text-sm'>h</sup>
                </h2>
                <h2 className=' text-xs font-medium text-gray-300'>Total</h2>
              </div>
            </div>
          </div>
          <div className='card bg-base-100 shadow-lg'>
            <div className='px-5 py-4 grid gap-2'>
              <div>
                <h2 className=' font-semibold text-primary-focus'>Work Hours</h2>
                <div className='icon'></div>
              </div>
              <div className=' flex justify-between items-end'>
                <h2 className=' text-3xl font-semibold'>
                  04:24 <sup className=' text-sm'>h</sup>
                </h2>
                <h2 className=' text-xs font-medium text-gray-300'>Total</h2>
              </div>
            </div>
          </div>
          <div className='card bg-base-100 shadow-lg'>
            <div className='px-5 py-4 grid gap-2'>
              <div>
                <h2 className=' font-semibold text-accent-focus'>Meeting Hours</h2>
                <div className='icon'></div>
              </div>
              <div className=' flex justify-between items-end'>
                <h2 className=' text-3xl font-semibold'>
                  02:15 <sup className=' text-sm'>h</sup>
                </h2>
                <h2 className=' text-xs font-medium text-gray-300'>Total</h2>
              </div>
            </div>
          </div>
          <div className='card bg-base-100 shadow-lg'>
            <div className='px-5 py-4 grid gap-2'>
              <div>
                <h2 className=' font-semibold text-yellow-500'>Break Hours</h2>
                <div className='icon'></div>
              </div>
              <div className=' flex justify-between items-end'>
                <h2 className=' text-3xl font-semibold'>
                  01:48 <sup className=' text-sm'>h</sup>
                </h2>
                <h2 className=' text-xs font-medium text-gray-300'>Total</h2>
              </div>
            </div>
          </div>
        </div>
        <div className='flex flex-col md:flex-row gap-5'>
          <div className='w-full md:w-2/3'>
            <StackedBarChart data={tasks} />
          </div>
          <div className='grow'>
            <PieCharts data={tasks} />
          </div>
        </div>
      </div>
    </div>
  );
}
