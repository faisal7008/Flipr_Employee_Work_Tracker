import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';

export default function TaskCard({ task }) {
  const dateTime = new Date(task.startTime);
  const startingTime = dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  dateTime.setMinutes(dateTime.getMinutes() + task.timeTaken);
  const endingTime = dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const [textareaHeight, setTextareaHeight] = useState();
  const textareaRef = useRef(null);

  useEffect(() => {
    adjustTextareaHeight();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [task.description]);

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      const { scrollHeight } = textareaRef.current;
      setTextareaHeight(`${scrollHeight}px`);
    }
  };

  return (
    <tr className='h-20 drop-shadow-md rounded-xl border-transparent bg-white'>
      <th className=' rounded-l-xl'>
        <textarea
          ref={textareaRef}
          type='text'
          rows={2}
          style={{ height: textareaHeight }}
          className=' input input-group-md input-sm w-72 resize-none border-none outline-none hover:bg-gray-100 focus:bg-gray-200'
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
        <button type='button' className='btn btn-sm whitespace-nowrap'>
          {moment(task.startTime).isSame(moment(), 'day')
            ? 'Today'
            : moment(task.startTime).isSame(moment().subtract(1, 'day'), 'day')
            ? 'Yesterday'
            : moment(task.startTime).format('ll')}
        </button>
      </td>
      <td>
        <input
          type='text'
          className='input input-group-md input-sm sm:w-full font-semibold border-none outline-none hover:bg-gray-100 focus:bg-gray-200'
          name='start-time'
          value={startingTime}
        />
      </td>
      <td>
        <input
          type='text'
          className='input input-group-md input-sm sm:w-full font-semibold border-none outline-none hover:bg-gray-100 focus:bg-gray-200'
          name='start-time'
          value={endingTime}
        />
      </td>
      <td className=' rounded-r-xl'>
        {' '}
        <div className='relative'>
          <input
            type='text'
            className=' input input-group-sm input-sm font-semibold border-none outline-none hover:bg-gray-100 focus:bg-gray-200'
            value={task.timeTaken}
          />
          <label className=' label absolute left-10 -mt-[34px]'> {' minutes'}</label>
        </div>
      </td>
    </tr>
  );
}
