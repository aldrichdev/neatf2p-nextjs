import { FormSubmitResult } from '@globalTypes/formSubmitResult'
import { NewsPost } from '@globalTypes/NewsPost'
import { Dispatch, SetStateAction } from 'react'

export type NewsPostSubmitProps = {
  image: string
  alt: string
  title: string
  bodyHtml: string
  bodyInput: string
  setSubmitResult: Dispatch<SetStateAction<FormSubmitResult>>
}

export type NewsPostFormProps = {
  /** The news post, if updating one. Undefined if creating one. */
  newsPost?: NewsPost
  /** Callback to handle submission of the news post form. */
  onSubmitForm: (props: NewsPostSubmitProps) => void
}
