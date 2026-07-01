import { cn } from '@utils/cn'

type SpinnerProps = {
  hiscores?: boolean
  className?: string
}

/** A spinning semi circle indicating progress or a loading state. */
const Spinner = (props: SpinnerProps) => {
  const { hiscores, className } = props

  const spinner = (
    <div className='border-primary-main mx-auto size-8 animate-spin rounded-full border-4 border-t-transparent' />
  )

  return hiscores ? (
    <div className={cn('mx-auto flex min-h-250 basis-full items-start justify-center md:basis-auto', className)}>
      {spinner}
    </div>
  ) : (
    <div className={cn('mx-auto max-w-200 text-center', className)}>{spinner}</div>
  )
}

export default Spinner
