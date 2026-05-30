import { CalloutProps } from './Callout.types'

/** A warning callout that displays information to the user. */
const Callout = (props: CalloutProps) => {
  const { children } = props

  return (
    <blockquote className='bg-callout-warning-bg border-callout-warning-border mt-5 max-w-full rounded-r-lg border-l-5'>
      <div className='p-4 text-left text-lg leading-normal'>{children}</div>
    </blockquote>
  )
}

export default Callout
