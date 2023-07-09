import * as React from 'react';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileTimePicker } from '@mui/x-date-pickers';
import './style.css';

export default function TimePickerModal({time, setTime}) {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <MobileTimePicker
        value={time}
        onChange={(val) => setTime(val)}
        slotProps={{
          dialog: {
            disablePortal: true,
            hideBackdrop: true,
            sx: { bgcolor: 'rgba(0, 0, 0, 0.1)', boxShadow: 'none', backdropFilter: 'none' },
          },
          textField: {
            className:
              'input input-group-md input-sm sm:w-full resize-none border-none outline-none bg-gray-100 focus:bg-gray-200 input-error',
          },
        }}
        className='w-full outline-none border-none'
      />
    </LocalizationProvider>
  );
}
