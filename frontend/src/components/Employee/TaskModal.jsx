import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { createTask, clearError } from '../../features/task/taskSlice';
import DatePickerModal from './DatePickerModal';
import TimePickerModal from './TimePickerModal';
import moment from 'moment';

export default function TaskModal() {
  const [description, setDescription] = useState('');
  const [taskType, setTaskType] = useState('');
  const [date, setDate] = useState(moment());
  const [time, setTime] = useState(moment());
  const [timeTaken, setTimeTaken] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const closeButtonRef = useRef(null);
  const dispatch = useDispatch();

  const resetState = () => {
    setDescription('');
    setTaskType('');
    setDate(moment());
    setTime(moment());
    setTimeTaken('');
  };

  const closeModal = async () => {
    // Click the close button
    if (closeButtonRef.current) {
      closeButtonRef.current.click();
    }
  };

  const handleSubmit = async () => {
    if (!description) {
      setErrorMsg('description');
      return;
    }
    if (!taskType) {
      setErrorMsg('taskType');
      return;
    }
    if (!date) {
      setErrorMsg('date');
      return;
    }
    if (!time) {
      setErrorMsg('time');
      return;
    }
    if (!timeTaken) {
      setErrorMsg('timeTaken');
      return;
    }
    setErrorMsg('');

    const startTime = date
    .hours(time.hours())
    .minutes(time.minutes())
    .seconds(time.seconds());

    const taskData = {
      description,
      taskType,
      startTime,
      timeTaken,
    };

    dispatch(createTask(taskData));
    dispatch(clearError());

    resetState();

    toast.success('Success! Task added', {
      position: toast.POSITION.BOTTOM_RIGHT,
    });

    closeModal();
  };

  return (
    <div>
      <dialog id='task_modal' className='modal overflow-hidden'>
        <form method='dialog' className='modal-box w-11/12 max-w-xl grid px-7 gap-4 overflow-hidden'>
          <h2 className=' text-center text-xl font-semibold tracking-wide uppercase text-gray-800'>
            Add Your Task
          </h2>
          <div className='form-control w-full'>
            <label className='label'>
              <span className='label-text font-medium'>What did you do?</span>
            </label>
            <textarea
              type='text'
              rows={3}
              className={`input input-group-md row-span-3 h-[6rem] input-sm sm:w-full resize-none border-none outline-none bg-gray-100 focus:bg-gray-200 ${
                errorMsg === 'description' ? ' input-error' : ''
              }`}
              placeholder='Describe your task'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            {errorMsg === 'description' && (
              <label className='label'>
                <span className='label-text-alt text-error font-semibold'>
                  Please enter the description
                </span>
              </label>
            )}
          </div>
          <div className='form-control w-full'>
            <label className='label'>
              <span className='label-text font-medium'>
                What category does your task belong to?
              </span>
            </label>
            <select
              className={`select select-sm w-full border-none outline-none bg-gray-100 focus:bg-gray-200 ${
                errorMsg === 'taskType' ? ' select-error' : ''
              }`}
              onChange={(e) => setTaskType(e.target.value)}
            >
              <option disabled selected>
                Select Task Type
              </option>
              <option value={'Work'}>Work</option>
              <option value={'Meeting'}>Meeting</option>
              <option value={'Break'}>Break</option>
            </select>
            {errorMsg === 'taskType' && (
              <label className='label'>
                <span className='label-text-alt text-error font-semibold'>
                  Please select the task type
                </span>
              </label>
            )}
          </div>
          <div className='form-control w-full'>
            <label className='label'>
              <span className='label-text font-medium'>When did you perform the task?</span>
            </label>
            <div className=' flex gap-4'>
              <DatePickerModal date={date} setDate={setDate} errorMsg={errorMsg}/>
              <TimePickerModal time={time} setTime={setTime} errorMsg={errorMsg}/>
            </div>
            {errorMsg === 'date' && (
              <label className='label'>
                <span className='label-text-alt text-error font-semibold'>
                  Please select the date
                </span>
              </label>
            )}
            {errorMsg === 'time' && (
              <label className='label'>
                <span className='label-text-alt text-error font-semibold'>
                  Please select the time
                </span>
              </label>
            )}
          </div>
          <div className='form-control w-full'>
            <label className='label'>
              <span className='label-text font-medium'>Time taken to complete it?</span>
            </label>
            <input
              type='number'
              className={`input input-group-sm input-sm font-semibold border-none outline-none bg-gray-100 focus:bg-gray-200 ${
                errorMsg === 'timeTaken' ? ' input-error' : ''
              }`}
              placeholder='Time taken in minutes'
              min={0}
              value={timeTaken}
              onChange={(e) => setTimeTaken(e.target.value)}
            />
            {errorMsg === 'timeTaken' && (
              <label className='label'>
                <span className='label-text-alt text-error font-semibold'>
                  Please enter the time taken
                </span>
              </label>
            )}
          </div>
          <div className='modal-action'>
            {/* if there is a button in form, it will close the modal */}
            <button ref={closeButtonRef} className='btn'>
              Cancel
            </button>
            <a role='button' type='submit' onClick={handleSubmit} className=' btn btn-success'>
              Add
            </a>
          </div>
        </form>
      </dialog>
    </div>
  );
}
