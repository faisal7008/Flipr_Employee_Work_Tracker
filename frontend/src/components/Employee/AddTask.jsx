import React, { useState } from 'react';

// Other way to add tasks

export default function AddTask({ task }) {
  const [description, setDescription] = useState('');
  const [taskType, setTaskType] = useState('');
  const [taskDate, setTaskDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [showDropdown, setShowDropdown] = useState(true);
  return (
    <tr className='h-20 mt-4 drop-shadow-md rounded-xl border-transparent bg-white'>
      <th className=' pt-4 rounded-l-xl'>
        <textarea
          type='text'
          rows={3}
          className='input input-group-md row-span-3 h-[6rem] input-sm sm:w-full resize-none border-none outline-none bg-gray-100 focus:bg-gray-200'
          placeholder='Describe your task'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </th>
      <td style={{ position: 'relative' }}>
        <div
          className='dropdown dropdown-bottom w-full flex justify-center'
          style={{ position: 'relative', zIndex: '100' }}
        >
          <div
            tabIndex={0}
            onClick={() => setShowDropdown(!showDropdown)}
            className='btn h-full bg-transparent border-0 text-gray-600 py-2 px-4'
          >
            {taskType || 'Select Type'}
          </div>
          <ul
            tabIndex={0}
            className={
              'dropdown-content menu z-50 p-2 mb-1 shadow bg-slate-100 rounded-lg' +
              ` ${showDropdown ? '' : 'hidden'}`
            }
            style={{ zIndex: '100' }}
          >
            <li>
              <button
                className=' bg-success'
                onClick={() => setShowDropdown(false) & setTaskType('Work')}
              >
                Work
              </button>
            </li>
            <li>
              <button
                className=' bg-success'
                onClick={() => setShowDropdown(false) & setTaskType('Meeting')}
              >
                Meeting
              </button>
            </li>
            <li>
              <button
                className=' bg-success'
                onClick={() => setShowDropdown(false) & setTaskType('Break')}
              >
                Break
              </button>
            </li>
          </ul>
        </div>
      </td>
      <td>
        <div className=' grid gap-2'>
          <button
            type='button'
            onClick={() => setTaskDate('today')}
            className={`btn btn-accent btn-sm ${taskDate === 'today' ? '' : 'btn-outline'}`}
          >
            Today
          </button>
          <button
            type='button'
            onClick={() => setTaskDate('yesterday')}
            className={`btn btn-accent btn-sm ${taskDate === 'yesterday' ? '' : 'btn-outline'}`}
          >
            Yesterday
          </button>
        </div>
      </td>
      <td>
        <input
          type='time'
          className='input input-group-md input-sm sm:w-full border-none outline-none bg-gray-100 focus:bg-gray-200'
          name='start-time'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </td>
      <td>
        <input
          type='time'
          className='input input-group-md input-sm sm:w-full border-none outline-none bg-gray-100 focus:bg-gray-200'
          name='start-time'
        />
      </td>
      <td className=' rounded-r-xl'>
        {' '}
        {/* <b>{task.timeTaken}</b>  */}
        <div className='relative'>
          <input
            type='number'
            className=' input input-group-sm input-sm font-semibold border-none outline-none bg-gray-100 focus:bg-gray-200'
            placeholder='Time taken in minutes'
            min={0}
          />
          {/* <label className=' label absolute left-10 -mt-[34px]'> {' minutes'}</label> */}
        </div>
      </td>
    </tr>
  );
}
