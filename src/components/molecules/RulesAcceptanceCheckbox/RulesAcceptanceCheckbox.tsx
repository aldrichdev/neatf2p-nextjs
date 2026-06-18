import { Checkbox } from '@ui/checkbox'
import { RulesAcceptanceCheckboxProps } from './RulesAcceptanceCheckbox.types'
import { StandardLink } from '@atoms/StandardLink'

const RulesAcceptanceCheckbox = (props: RulesAcceptanceCheckboxProps) => {
  const { onChange } = props

  return (
    <div className='flex basis-full items-center gap-2 text-left'>
      <Checkbox id='rules-acceptance' required onCheckedChange={checked => onChange(checked as boolean)} />
      <label htmlFor='rules-acceptance' className='cursor-pointer text-base'>
        I have read and agree to the{' '}
        <StandardLink href='/about/rules' target='_blank'>
          server rules
        </StandardLink>
      </label>
    </div>
  )
}

export default RulesAcceptanceCheckbox
