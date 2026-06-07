import clsx from 'clsx'
import { CalloutProps } from './Callout.types'

/** A warning callout that displays information to the user. */
const Callout = (props: CalloutProps) => {
  const { children } = props

  return (
    <blockquote
      className={clsx(
        'bg-callout-warning-bg border-callout-warning-border max-w-full',
        'rounded-r-lg border-l-5 font-normal',
      )}
    >
      <div className='p-4 text-left text-lg leading-normal'>{children}</div>
    </blockquote>
  )
}

export default Callout
