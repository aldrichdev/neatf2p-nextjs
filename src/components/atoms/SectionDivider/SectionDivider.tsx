import { SectionDividerContainer, SectionLeftText, SectionLine } from './SectionDivider.styled'
import { SectionDividerProps } from './SectionDivider.types'

/** A divider component that displays the left text, a horizontal line, then the right text. */
const SectionDivider = (props: SectionDividerProps) => {
  const { leftText, rightText } = props

  return (
    <SectionDividerContainer>
      <SectionLeftText>{leftText}</SectionLeftText>
      <SectionLine />
      <span>{rightText}</span>
    </SectionDividerContainer>
  )
}

export default SectionDivider
