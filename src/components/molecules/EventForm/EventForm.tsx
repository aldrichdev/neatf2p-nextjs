import { Checkbox } from '@ui/checkbox'
import { EventFormProps } from './EventForm.types'
import { ChangeEvent, useState } from 'react'
import { DateTimePicker } from '@atoms/DateTimePicker'
import { convertMillisToEpochTimestamp } from '@utils/date/date'
import { Input } from '@ui/input'
import { Button } from '@ui/button'
import clsx from 'clsx'

const submitColorClass: Record<string, string> = {
  green: 'text-primary-main',
  red: 'text-red-600',
}

/** A reusable form for creating or updating an event. */
const EventForm = (props: EventFormProps) => {
  const { websiteEvent, onSubmitForm } = props
  const [title, setTitle] = useState<string>(websiteEvent?.Title || '')
  const [startDate, setStartDate] = useState<Date>(
    websiteEvent?.StartDate ? new Date(websiteEvent.StartDate * 1000) : new Date(),
  )
  const [endDate, setEndDate] = useState<Date>(
    websiteEvent?.EndDate ? new Date(websiteEvent.EndDate * 1000) : new Date(),
  )
  const [relativeUrl, setRelativeUrl] = useState<string>(websiteEvent?.RelativeUrl || '')
  const [location, setLocation] = useState<string>(websiteEvent?.Location || '')
  const [emojiName, setEmojiName] = useState<string | null>(websiteEvent?.EmojiName || '')
  const [recurring, setRecurring] = useState<boolean>(Boolean(websiteEvent?.Recurring || 0))
  const [recursEvery, setRecursEvery] = useState<string | null>(websiteEvent?.RecursEvery || '')
  const [submitDisabled, setSubmitDisabled] = useState(false)
  const [submitResult, setSubmitResult] = useState<{ answer: string; code: string }>()

  console.log('startDate', startDate)

  const enableSubmit = () => setSubmitDisabled(false)

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value)
    enableSubmit()
  }

  const handleStartDateChange = (value: Date | undefined) => {
    console.log('value', value)
    if (!value) {
      return
    }

    setStartDate(value)
    enableSubmit()
  }

  const handleEndDateChange = (value: Date | undefined) => {
    console.log('value', value)
    if (!value) {
      return
    }

    setEndDate(value)
    enableSubmit()
  }

  const handleRelativeUrlChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRelativeUrl(event.target.value)
    enableSubmit()
  }

  const handleLocationChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLocation(event.target.value)
    enableSubmit()
  }

  const handleEmojiNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmojiName(event.target.value)
    enableSubmit()
  }

  const handleRecurringChange = (checked: boolean) => {
    setRecurring(checked)
    enableSubmit()
  }

  const handleRecursEveryChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRecursEvery(event.target.value)
    enableSubmit()
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitDisabled(true)

    console.log('startDate', convertMillisToEpochTimestamp(startDate.getTime()))
    console.log('endDate', convertMillisToEpochTimestamp(endDate.getTime()))

    // Submit the form using the callback provided (will create or update an event)
    onSubmitForm({
      Id: websiteEvent ? websiteEvent.Id : 0,
      Title: title,
      StartDate: convertMillisToEpochTimestamp(startDate.getTime()),
      EndDate: convertMillisToEpochTimestamp(endDate.getTime()),
      RelativeUrl: relativeUrl,
      Location: location,
      EmojiName: emojiName || undefined,
      Recurring: Number(recurring),
      RecursEvery: recursEvery || undefined,
      setSubmitResult,
    })
  }

  return (
    <form onSubmit={handleSubmit} className='flex flex-wrap text-left'>
      <Input
        id='title'
        placeholder='Title'
        onChange={handleTitleChange}
        value={title}
        required
        className='mt-5 basis-full'
      />
      <div className='mt-5 flex w-full items-center justify-between gap-5'>
        <DateTimePicker label='Start Date' value={startDate} onChange={handleStartDateChange} className='w-full' />
        <DateTimePicker label='End Date' value={endDate} onChange={handleEndDateChange} className='w-full' />
      </div>
      <Input
        id='relativeUrl'
        placeholder='Enter a relative URL to a news post with event information (e.g. /news/post/100)'
        onChange={handleRelativeUrlChange}
        value={relativeUrl}
        className='mt-5 basis-full'
      />
      <Input
        id='location'
        placeholder='Enter the location that the event will take place (e.g. Varrock)'
        onChange={handleLocationChange}
        value={location}
        className='mt-5 basis-full'
      />
      <Input
        id='emojiName'
        placeholder='Enter an emoji name here to prefix the title with it (only certain pre-defined emoji names will work)'
        onChange={handleEmojiNameChange}
        value={emojiName ?? ''}
        className='mt-5 basis-full'
      />
      <div className='mt-[11px] flex basis-full items-center gap-2'>
        <Checkbox
          id='recurring'
          checked={recurring}
          onCheckedChange={checked => handleRecurringChange(checked as boolean)}
        />
        <label htmlFor='recurring' className='cursor-pointer'>
          Recurring?
        </label>
      </div>
      {recurring && (
        <Input
          id='recursEvery'
          placeholder='e.g. "Wednesday", "1st Sunday of every month", etc'
          onChange={handleRecursEveryChange}
          value={recursEvery ?? ''}
          className='mt-5 basis-full'
        />
      )}
      <div className='flex w-full flex-wrap items-center justify-center'>
        <Button type='submit' disabled={submitDisabled} className='mt-10 basis-full'>
          Submit
        </Button>
      </div>
      <label className={clsx('mt-2.5 basis-full', submitColorClass[submitResult?.code ?? ''] ?? 'text-black')}>
        {submitResult?.answer}
      </label>
    </form>
  )
}

export default EventForm
