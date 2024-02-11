import { CalloutContainer, CalloutContent } from './Callout.styled'
import { CalloutProps } from './Callout.types'

const Callout = (props: CalloutProps) => {
  const { variant, children } = props

  return (
    <CalloutContainer variant={variant}>
      <CalloutContent>{children}</CalloutContent>
    </CalloutContainer>
  )
}

export default Callout
