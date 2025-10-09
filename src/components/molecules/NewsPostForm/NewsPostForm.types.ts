export type NewsPostFormProps = {
  /** The ID of the news post, if updating one. Undefined if creating one. */
  newsPostId?: number
  /** The ID of the news post's image, if updating a news post. Undefined if creating one.
   * TODO: How is the Update page that renders <NewsPostForm> supposed to get the imageId?
   */
  imageId?: number
  /** The ID of the logged in user. */
  userId: string
}
