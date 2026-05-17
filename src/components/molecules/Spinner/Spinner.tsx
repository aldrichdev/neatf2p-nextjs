import { CircularProgress } from '@mui/material'

type SpinnerProps = {
  hiscores?: boolean
}

/** A spinning semi circle indicating progress or a loading state. */
const Spinner = (props: SpinnerProps) => {
  const { hiscores } = props

  return hiscores ? (
    <div className='flex basis-full items-start justify-center mx-auto min-h-[1000px] md:basis-auto'>
      <CircularProgress color='success' />
    </div>
  ) : (
    <div className='max-w-200 mx-auto text-center'>
      <CircularProgress color='success' />
    </div>
  )
}

export default Spinner
