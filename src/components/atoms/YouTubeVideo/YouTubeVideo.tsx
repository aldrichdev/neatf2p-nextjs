import { YouTubeVideoIframe } from './YouTubeVideo.styled'
import { YouTubeVideoProps } from './YouTubeVideo.types'

const YouTubeVideo = (props: YouTubeVideoProps) => {
  const { embedUrl, desktopWidth, desktopHeight } = props

  return (
    <YouTubeVideoIframe
      src={`${embedUrl}&rel=0`}
      title='YouTube video player'
      allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
      allowFullScreen
      desktopWidth={desktopWidth}
      desktopHeight={desktopHeight}
    ></YouTubeVideoIframe>
  )
}

export default YouTubeVideo
