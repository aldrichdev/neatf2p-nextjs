import { Checkbox } from '@mui/material'
import { RulesFormControlLabel } from './RulesAcceptanceCheckbox.styled'
import { RulesAcceptanceCheckboxProps } from './RulesAcceptanceCheckbox.types'
import { InlineLink } from '@atoms/InlineLink'

const RulesAcceptanceCheckbox = (props: RulesAcceptanceCheckboxProps) => {
  const { onChange } = props

  return (
    <RulesFormControlLabel
      control={<Checkbox color='success' onChange={onChange} required />}
      label={
        <>
          I have read and agree to the
          <InlineLink href='/about/rules' target='_blank'>
            server rules
          </InlineLink>
        </>
      }
    />
  )
}

export default RulesAcceptanceCheckbox
