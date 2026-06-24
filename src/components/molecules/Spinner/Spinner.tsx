type SpinnerProps = {
  hiscores?: boolean
}

/** A spinning semi circle indicating progress or a loading state. */
const Spinner = (props: SpinnerProps) => {
  const { hiscores } = props

  const spinner = (
    <div className='border-primary-main mx-auto size-8 animate-spin rounded-full border-4 border-t-transparent' />
  )

  return hiscores ? (
    <div className='mx-auto flex min-h-250 basis-full items-start justify-center md:basis-auto'>{spinner}</div>
  ) : (
    <div className='mx-auto max-w-200 text-center'>{spinner}</div>
  )
}

export default Spinner
