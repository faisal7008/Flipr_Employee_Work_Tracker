import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import StackedBarChart from '../../utils/charts/StackedBarChart';
import PieCharts from '../../utils/charts/PieCharts';
import { getTasksByEmployee } from '../../features/task/taskSlice';

const userimage =
  'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80';

export default function EmployeeCard({ employee, tasks }) {
  return (
    <div className='collapse collapse-arrow bg-base-100 shadow-md '>
      <input type='checkbox' />
      <div className='collapse-title text-xl font-medium'>
        <div className='flex gap-2 justify-between'>
          <div className='flex items-center space-x-3'>
            <div className='avatar'>
              <div className='mask mask-squircle w-9 h-9'>
                <img src={userimage} alt='user-image' />
              </div>
            </div>
            <div>
              <div className='font-semibold capitalize text-base'>{employee.name}</div>
              <div className='text-xs opacity-50'>{employee.department}</div>
            </div>
          </div>
          <div>
            <div>
              <div
                className={`badge p-3 ${
                  employee.status === 'active' ? 'badge-primary' : 'badge-error'
                }`}
              >
                {employee.status}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='collapse-content'>
        <div className='flex flex-col md:flex-row pb-2 md:pb-0 gap-5'>
          <div className='w-full md:w-2/3'>
            <StackedBarChart data={tasks} height={300} border={true} />
          </div>
          <div className='grow'>
            <PieCharts data={tasks} height={300} border={true} />
          </div>
        </div>
      </div>
    </div>
  );
}
