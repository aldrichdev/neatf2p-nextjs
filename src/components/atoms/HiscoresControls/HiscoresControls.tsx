import { HiscoresControlsContainer, HiscoresPagination } from './HiscoresControls.styled'
import { HiscoresControlsProps } from './HiscoresControls.types'

const HiscoresControls = (props: HiscoresControlsProps) => {
  const { page, pageCount, handlePageChange } = props

  return (
    <HiscoresControlsContainer>
      <HiscoresPagination
        page={page ?? 1}
        count={pageCount}
        shape='rounded'
        color='primary'
        onChange={handlePageChange}
      />
    </HiscoresControlsContainer>
  )
}

export default HiscoresControls
