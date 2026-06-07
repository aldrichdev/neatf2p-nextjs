import { YouTubeVideoProps } from './YouTubeVideo.types'

const YouTubeVideo = (props: YouTubeVideoProps) => {
  const { embedUrl } = props

  return (
    <iframe
      src={`${embedUrl}&rel=0`}
      title='YouTube video player'
      allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
      allowFullScreen
      className='h-47 w-full border-0 md:h-107.25 lg:h-150'
    />
  )
}

export default YouTubeVideo
