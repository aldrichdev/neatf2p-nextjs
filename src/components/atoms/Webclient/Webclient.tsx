import { WebclientIframe } from './Webclient.styled'

const Webclient = () => {
  const gameServerHost = process.env.NEXT_PUBLIC_GAME_SERVER_HOST
  const gameServerRsaPublicKey = process.env.NEXT_PUBLIC_GAME_SERVER_RSA_PUBLIC_KEY

  return (
    <WebclientIframe
      src={`https://${gameServerHost}/index.html#free,${gameServerHost},43494,65537,${gameServerRsaPublicKey},true`}
      height='352px'
      width='513px'
    ></WebclientIframe>
  )
}

export default Webclient
