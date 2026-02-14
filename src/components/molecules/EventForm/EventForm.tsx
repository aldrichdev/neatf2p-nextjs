import { Field } from '@atoms/Field'
import { Checkbox, FormControlLabel } from '@mui/material'
import { StyledForm, SubmitButton, SubmitMessage } from '@styledPages/Form.styled'
import { EventFormProps } from './EventForm.types'
import { ChangeEvent, useState } from 'react'
import { NUMERIC_INPUT_PROPS } from 'src/consts'
import { EventFormGroup, EventSubmitArea } from './EventForm.styled'

/** A reusable form for creating or updating an event. */
const EventForm = (props: EventFormProps) => {
  const { websiteEvent, onSubmitForm } = props
  const [title, setTitle] = useState<string>(websiteEvent?.title || '')
  const [startDate, setStartDate] = useState<number>(websiteEvent?.startDate || 0)
  const [endDate, setEndDate] = useState<number>(websiteEvent?.endDate || 0)
  const [relativeUrl, setRelativeUrl] = useState<string>(websiteEvent?.relativeUrl || '')
  const [location, setLocation] = useState<string>(websiteEvent?.location || '')
  const [emojiName, setEmojiName] = useState<string | null>(websiteEvent?.emojiName || null)
  const [recurring, setRecurring] = useState<boolean>(Boolean(websiteEvent?.recurring || 0))
  const [recursEvery, setRecursEvery] = useState<string | null>(websiteEvent?.recursEvery || null)
  const [submitDisabled, setSubmitDisabled] = useState(false)
  const [submitResult, setSubmitResult] = useState<{ answer: string; code: string }>()

  const enableSubmit = () => setSubmitDisabled(false)

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value)
    enableSubmit()
  }

  const handleStartDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    // Replace any non-digit characters with an empty string
    const numericValue = event.target.value.replace(/[^0-9]/g, '')
    setStartDate(Number(numericValue))
    enableSubmit()
  }

  const handleEndDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    // Replace any non-digit characters with an empty string
    const numericValue = event.target.value.replace(/[^0-9]/g, '')
    setEndDate(Number(numericValue))
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

    // Submit the form using the callback provided (will create or update an event)
    onSubmitForm({
      id: websiteEvent ? websiteEvent.id : 0,
      title,
      startDate,
      endDate,
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
      <Field
        id='startDate'
        label='Start Date'
        variant='outlined'
        onChange={handleStartDateChange}
        value={startDate || ''}
        required
        inputProps={NUMERIC_INPUT_PROPS}
      />
      <Field
        id='endDate'
        label='End Date'
        variant='outlined'
        onChange={handleEndDateChange}
        value={endDate || ''}
        required
        inputProps={NUMERIC_INPUT_PROPS}
      />
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
