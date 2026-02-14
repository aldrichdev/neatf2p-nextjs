import { Field } from '@atoms/Field'
import { Checkbox, FormControlLabel } from '@mui/material'
import { StyledForm, SubmitButton, SubmitMessage } from '@styledPages/Form.styled'
import { EventFormProps } from './EventForm.types'
import { ChangeEvent, useState } from 'react'
import { DateTimePickerArea, EventFormGroup, EventSubmitArea } from './EventForm.styled'
import { DateTimePicker } from '@atoms/DateTimePicker'
import { PickerValue } from '@mui/x-date-pickers/internals'
import { DateTimeValidationError, PickerChangeHandlerContext } from '@mui/x-date-pickers/models'
import dayjs, { Dayjs } from 'dayjs'
import { convertMillisToEpochTimestamp } from '@helpers/date/date'

/** A reusable form for creating or updating an event. */
const EventForm = (props: EventFormProps) => {
  const { websiteEvent, onSubmitForm } = props
  const [title, setTitle] = useState<string>(websiteEvent?.title || '')
  const [startDate, setStartDate] = useState<Dayjs>(dayjs(websiteEvent?.startDate))
  const [endDate, setEndDate] = useState<Dayjs>(dayjs(websiteEvent?.endDate))
  const [relativeUrl, setRelativeUrl] = useState<string>(websiteEvent?.relativeUrl || '')
  const [location, setLocation] = useState<string>(websiteEvent?.location || '')
  const [emojiName, setEmojiName] = useState<string | null>(websiteEvent?.emojiName || '')
  const [recurring, setRecurring] = useState<boolean>(Boolean(websiteEvent?.recurring || 0))
  const [recursEvery, setRecursEvery] = useState<string | null>(websiteEvent?.recursEvery || '')
  const [submitDisabled, setSubmitDisabled] = useState(false)
  const [submitResult, setSubmitResult] = useState<{ answer: string; code: string }>()

  const enableSubmit = () => setSubmitDisabled(false)

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value)
    enableSubmit()
  }

  const handleStartDateChange = (value: PickerValue, context: PickerChangeHandlerContext<DateTimeValidationError>) => {
    console.log('value', value, 'context', context)
    if (!value) {
      return
    }

    setStartDate(value)
    enableSubmit()
  }

  const handleEndDateChange = (value: PickerValue, context: PickerChangeHandlerContext<DateTimeValidationError>) => {
    console.log('value', value, 'context', context)
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

  const handleRecurringChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRecurring(event.target.checked)
    enableSubmit()
  }

  const handleRecursEveryChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRecursEvery(event.target.value)
    enableSubmit()
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitDisabled(true)

    console.log('startDate', convertMillisToEpochTimestamp(startDate.toDate().getTime()))
    console.log('endDate', convertMillisToEpochTimestamp(endDate.toDate().getTime()))

    // Submit the form using the callback provided (will create or update an event)
    onSubmitForm({
      id: websiteEvent ? websiteEvent.id : 0,
      title,
      startDate: convertMillisToEpochTimestamp(startDate.toDate().getTime()),
      endDate: convertMillisToEpochTimestamp(endDate.toDate().getTime()),
      relativeUrl,
      location,
      emojiName,
      recurring,
      recursEvery,
      setSubmitResult,
    })
  }

  return (
    <StyledForm onSubmit={handleSubmit}>
      <Field id='title' label='Title' variant='outlined' onChange={handleTitleChange} value={title} required />
      <DateTimePickerArea>
        <DateTimePicker
          label='Start Date'
          value={startDate}
          onChange={handleStartDateChange}
          slotProps={{
            textField: {
              required: true,
            },
          }}
        />
        <DateTimePicker
          label='End Date'
          value={endDate}
          onChange={handleEndDateChange}
          slotProps={{
            textField: {
              required: true,
            },
          }}
        />
      </DateTimePickerArea>
      <Field
        id='relativeUrl'
        label='Relative URL'
        variant='outlined'
        onChange={handleRelativeUrlChange}
        value={relativeUrl}
        placeholder='Enter a relative URL to a news post with event information (e.g. /news/post/100)'
      />
      <Field
        id='location'
        label='Location'
        variant='outlined'
        onChange={handleLocationChange}
        value={location}
        placeholder='Enter the location that the event will take place (e.g. Varrock)'
      />
      <Field
        id='emojiName'
        label='Emoji Name'
        variant='outlined'
        onChange={handleEmojiNameChange}
        value={emojiName}
        placeholder='Enter an emoji name here to prefix the title with it (only certain pre-defined emoji names will work)'
      />
      <EventFormGroup>
        <FormControlLabel
          control={<Checkbox value={recurring} onChange={handleRecurringChange} />}
          label='Recurring?'
        />
      </EventFormGroup>
      {recurring && (
        <Field
          id='recursEvery'
          label='Recurs Every'
          variant='outlined'
          onChange={handleRecursEveryChange}
          value={recursEvery}
          placeholder='e.g. "Wednesday", "1st Sunday of every month", etc'
        />
      )}

      <EventSubmitArea>
        <SubmitButton variant='contained' type='submit' disabled={submitDisabled}>
          Submit
        </SubmitButton>
      </EventSubmitArea>
      <SubmitMessage color={submitResult?.code}>{submitResult?.answer}</SubmitMessage>
    </StyledForm>
  )
}

export default EventForm
