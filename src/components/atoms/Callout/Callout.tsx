import { Box } from './Callout.styled'
import { CalloutProps } from './Callout.types'

const Callout = (props: CalloutProps) => {
  const { children } = props

  return <Box>{children}</Box>
}

export default Callout
