import clsx from 'clsx'
import { SectionDividerProps } from './SectionDivider.types'

/** A divider component that displays the left text, a horizontal line, then the right text. */
const SectionDivider = (props: SectionDividerProps) => {
  const { leftText, rightText } = props

  return (
    <div
      className={clsx(
        'text-tertiary-text my-2.5 mb-2 flex items-center gap-1.5 py-1',
        'text-xs whitespace-nowrap md:gap-2 md:py-1.5',
      )}
    >
      <span className='font-semibold tracking-[0.06em] uppercase'>{leftText}</span>
      <div className='bg-divider h-px flex-1' />
      <span className='font-normal'>{rightText}</span>
    </div>
  )
}

export default SectionDivider
