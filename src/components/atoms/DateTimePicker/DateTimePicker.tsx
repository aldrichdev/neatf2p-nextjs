import { ChangeEvent, useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '@ui/popover'
import { Calendar } from '@ui/calendar'
import { Button } from '@ui/button'
import { Input } from '@ui/input'
import { CalendarIcon } from 'lucide-react'
import { DatePickerProps } from './DateTimePicker.types'
import clsx from 'clsx'
import { formatDate, formatTime } from './DateTimePicker.utils'

const DateTimePicker = (props: DatePickerProps) => {
  const { label, value, onChange, className } = props
  const [open, setOpen] = useState(false)
  const [time, setTime] = useState(value ? formatTime(value) : '00:00')

  const handleDateSelect = (date: Date | undefined) => {
    if (!date) {
      onChange?.(undefined)
      return
    }

    const [hours, minutes] = time.split(':').map(Number)
    const combined = new Date(date)
    combined.setHours(hours, minutes)

    onChange?.(combined)
    setOpen(false)
  }

  const handleTimeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newTime = event.target.value
    setTime(newTime)

    if (value) {
      const [hours, minutes] = newTime.split(':').map(Number)
      const combined = new Date(value)
      combined.setHours(hours, minutes)
      onChange?.(combined)
    }
  }

  return (
    <div className={clsx('flex flex-wrap gap-2', className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant='outline' className='justify-start text-left font-normal'>
            <CalendarIcon className='mr-2 size-4' />
            {value ? formatDate(value) : label}
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-auto p-0'>
          <Calendar mode='single' selected={value} onSelect={handleDateSelect} />
        </PopoverContent>
      </Popover>
      <Input type='time' value={time} onChange={handleTimeChange} className='w-32' />
    </div>
  )
}

export default DateTimePicker
