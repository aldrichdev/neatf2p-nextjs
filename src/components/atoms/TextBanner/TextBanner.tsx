import { Box } from './TextBanner.styled'
import { TextBannerProps } from './TextBanner.types'

const TextBanner = (props: TextBannerProps) => {
  const { children } = props

  return <Box>{children}</Box>
}

export default TextBanner
