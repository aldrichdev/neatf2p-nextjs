import { FormSubmitResult } from '@globalTypes/formSubmitResult'
import { Dispatch, SetStateAction } from 'react'

export type WebsiteEvent = {
  id: number
  title: string
  startDate: number
  endDate: number
  relativeUrl: string
  location: string
  emojiName: string | null
  recurring: boolean
  recursEvery: string | null
}

export type EventSubmitProps = WebsiteEvent & {
  setSubmitResult: Dispatch<SetStateAction<FormSubmitResult>>
}

export type EventFormProps = {
  /** The event, if updating one. Undefined if creating one. */
  websiteEvent?: WebsiteEvent
  /** Callback to handle submission of the event form. */
  onSubmitForm: (props: EventSubmitProps) => void
}
