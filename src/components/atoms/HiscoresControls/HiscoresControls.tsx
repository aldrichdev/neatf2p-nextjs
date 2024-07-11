import { HiscoresControlsContainer, HiscoresPagination, ScrollToTopButton } from './HiscoresControls.styled'
import { HiscoresControlsProps } from './HiscoresControls.types'

const HiscoresControls = (props: HiscoresControlsProps) => {
  const { page, pageCount, handlePageChange, handleScrollToTop } = props

  return (
    <HiscoresControlsContainer>
      <HiscoresPagination
        page={page ?? 1}
        count={pageCount}
        shape='rounded'
        color='primary'
        onChange={handlePageChange}
      />
      <ScrollToTopButton onClick={handleScrollToTop} />
    </HiscoresControlsContainer>
  )
}

export default HiscoresControls
