import { CircularProgress } from '@mui/material'

type SpinnerProps = {
  hiscores?: boolean
}

/** A spinning semi circle indicating progress or a loading state. */
const Spinner = (props: SpinnerProps) => {
  const { hiscores } = props

  return hiscores ? (
    <div className='mx-auto flex min-h-250 basis-full items-start justify-center md:basis-auto'>
      <CircularProgress color='success' />
    </div>
  ) : (
    <div className='mx-auto max-w-200 text-center'>
      <CircularProgress color='success' />
    </div>
  )
}

export default Spinner
