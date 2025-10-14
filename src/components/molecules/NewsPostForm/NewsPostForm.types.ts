import { NewsPost } from '@globalTypes/NewsPost'

export type NewsPostFormProps = {
  /** The news post, if updating one. Undefined if creating one. */
  newsPost?: NewsPost
  /** The ID of the logged in user. */
  userId: string
}
