import { getImageUrlFromBase64 } from './base64'

/** Gets a URL of the news post image, or a placeholder image if there isn't an image. */
export const getNewsPostImageUrl = (newsPostImage: string) => {
  // Show a placeholder image if there isn't an image in the database
  if (!newsPostImage) {
    return "/img/NewsImagePlaceholder.png"
  }

  return getImageUrlFromBase64(newsPostImage)
}