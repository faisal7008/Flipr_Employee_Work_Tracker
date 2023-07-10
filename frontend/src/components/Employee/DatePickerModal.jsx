import * as React from 'react';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import './style.css';

export default function DatePickerModal({date, setDate}) {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <MobileDatePicker
        value={date}
        onChange={(val) => setDate(val)}
        slotProps={{
          dialog: {
            disablePortal: true,
            hideBackdrop: 'false',
            sx: { bgcolor: 'rgba(0, 0, 0, 0.1)', boxShadow: 'none', backdropFilter: 'none' },
          },
          field: {
            className:
              'input input-group-md input-sm sm:w-full resize-none border-none outline-none bg-gray-100 focus:bg-gray-200'
          }
        }}
        className='w-full outline-none border-none'
      />
    </LocalizationProvider>
  );
}
