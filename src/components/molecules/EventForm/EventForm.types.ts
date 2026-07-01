import { FormSubmitResult } from '@globalTypes/formSubmitResult'
import { DatabaseEvent } from '@globalTypes/event'
import { Dispatch, SetStateAction } from 'react'

export type EventSubmitProps = DatabaseEvent & {
  setSubmitResult: Dispatch<SetStateAction<FormSubmitResult>>
}

export type EventFormProps = {
  /** The event, if updating one. Undefined if creating one. */
  websiteEvent?: DatabaseEvent
  /** Callback to handle submission of the event form. */
  onSubmitForm: (props: EventSubmitProps) => void
}
