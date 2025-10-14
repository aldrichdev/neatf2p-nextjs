import { NewsPost } from '@globalTypes/NewsPost'
import { Dispatch, SetStateAction } from 'react'

export type NewsPostSubmitResult =
  | {
      answer: string
      code: string
    }
  | undefined

export type NewsPostSubmitProps = {
  image: string
  alt: string
  title: string
  bodyHtml: string
  bodyInput: string
  setSubmitResult: Dispatch<SetStateAction<NewsPostSubmitResult>>
}

export type NewsPostFormProps = {
  /** The news post, if updating one. Undefined if creating one. */
  newsPost?: NewsPost
  /** The ID of the logged in user. */
  userId: string
  /** Callback to handle submission of the news post form. */
  submitForm: (props: NewsPostSubmitProps) => void
}
