import { YouTubeVideoIframe } from './YouTubeVideo.styled'
import { YouTubeVideoProps } from './YouTubeVideo.types'

const YouTubeVideo = (props: YouTubeVideoProps) => {
  const { embedUrl } = props

  return (
    <YouTubeVideoIframe
      src={`${embedUrl}&vq=hd1080&rel=0`}
      title='YouTube video player'
      allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
      allowFullScreen
    ></YouTubeVideoIframe>
  )
}

export default YouTubeVideo
