import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePickerProps } from './DateTimePicker.types'
import { DateTimePicker as MuiDateTimePicker } from '@mui/x-date-pickers/DateTimePicker'

const DateTimePicker = (props: DatePickerProps) => {
  const { label, value, onChange, slotProps } = props

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}>
        <MuiDateTimePicker label={label} onChange={onChange} value={value} slotProps={slotProps} />
      </DemoContainer>
    </LocalizationProvider>
  )
}

export default DateTimePicker
