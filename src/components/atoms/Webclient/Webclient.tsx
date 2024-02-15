import { WebclientIframe } from './Webclient.styled'
import { WebclientProps } from './Webclient.types'

const Webclient = (props: WebclientProps) => {
  const { url } = props

  return <WebclientIframe src={url} height='352px' width='513px'></WebclientIframe>
}

export default Webclient
