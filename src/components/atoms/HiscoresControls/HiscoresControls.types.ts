export type HiscoresControlsProps = {
  page: number
  pageCount: number
  handlePageChange: (event: React.ChangeEvent<unknown>, value: number) => void
  handleScrollToTop: () => void
}
