import { DateTimePickerSlotProps } from '@mui/x-date-pickers/DateTimePicker'
import { PickerValue } from '@mui/x-date-pickers/internals'
import { DateTimeValidationError, PickerChangeHandlerContext } from '@mui/x-date-pickers/models'
import { Dayjs } from 'dayjs'

export type DatePickerProps = {
  label: string
  value?: Dayjs
  onChange?: (value: PickerValue, context: PickerChangeHandlerContext<DateTimeValidationError>) => void
  slotProps?: DateTimePickerSlotProps<true>
}
