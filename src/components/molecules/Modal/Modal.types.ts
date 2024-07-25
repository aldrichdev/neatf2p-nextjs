import { FormEvent } from 'react'

export type ModalProps = {
  open: boolean
  handleClose: () => void
  heading: string
  body: JSX.Element
  hasForm?: boolean
  /** If the modal should have a form, what should happen when the form is submitted? */
  handleSubmit?: (event: FormEvent<HTMLFormElement>) => void
  /** If the modal should have a form, render whatever fields needed for it. */
  renderFields?: () => JSX.Element
  formValidationError?: string
  formSuccessMessage?: string
  bodyScrollable?: boolean
}
