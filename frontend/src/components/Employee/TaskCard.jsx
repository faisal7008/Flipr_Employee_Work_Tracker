import moment from 'moment';
import React, { useState } from 'react';

export default function TaskCard({ task }) {
  const dateTime = new Date(task.startTime);
  const startingTime = dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  dateTime.setMinutes(dateTime.getMinutes() + task.timeTaken);
  const endingTime = dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <tr className='h-20 mt-4 drop-shadow-md rounded-xl border-transparent bg-white'>
      <th className=' rounded-l-xl'>
        <textarea
          type='text'
          rows={2}
          className=' input input-group-md input-sm w-72 border-none outline-none hover:bg-gray-100 focus:bg-gray-200'
          value={task.description}
        />
      </th>
      <td>
        {task.taskType === 'Work' && (
          <button type='button' className='btn btn-sm btn-primary rounded-full'>
            Work
          </button>
        )}
        {task.taskType === 'Meeting' && (
          <button type='button' className='btn btn-sm btn-accent rounded-full'>
            Meeting
          </button>
        )}
        {task.taskType === 'Break' && (
          <button type='button' className='btn btn-sm btn-warning rounded-full'>
            Break
          </button>
        )}
      </td>
      <td>
        {' '}
        <button type='button' className='btn btn-sm'>
          {moment(task.startTime).isSame(moment(), 'day')
            ? 'Today'
            : moment(task.startTime).isSame(moment().subtract(1, 'day'), 'day')
            ? 'Yesterday'
            : moment(task.startTime).format('ll')}
        </button>
      </td>
      <td>
        <input
          type='time'
          className='input input-group-md input-sm sm:w-full font-semibold border-none outline-none hover:bg-gray-100 focus:bg-gray-200'
          name='start-time'
          value={startingTime}
        />
      </td>
      <td>
        <input
          type='time'
          className='input input-group-md input-sm sm:w-full font-semibold border-none outline-none hover:bg-gray-100 focus:bg-gray-200'
          name='start-time'
          value={endingTime}
        />
      </td>
      <td className=' rounded-r-xl'>
        {' '}
        <div className='relative'>
          <input
            type='number'
            className=' input input-group-sm input-sm font-semibold border-none outline-none hover:bg-gray-100 focus:bg-gray-200'
            value={task.timeTaken}
          />
          <label className=' label absolute left-10 -mt-[34px]'> {' minutes'}</label>
        </div>
      </td>
    </tr>
  );
}
