import { push } from '@helpers/router'
import { useRouter } from 'next/router'

const useHiscoresPagination = (
  isNpcHiscores: boolean,
  hiscoreCount: number,
  page: number,
  setPage: (page: number) => void,
) => {
  const router = useRouter()
  const resultsPerPage = 20
  const pageCount = Math.ceil(hiscoreCount / resultsPerPage)
  const startingRecord = page === 1 ? 0 : (page - 1) * resultsPerPage
  const endingRecord = page == 1 ? resultsPerPage : startingRecord + resultsPerPage

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
    router.query.page = value.toString()
    push(router, isNpcHiscores ? '/npc-hiscores' : '/hiscores', router.query)
  }

  const handleScrollToTop = () => {
    window.scrollTo({ top: 525, behavior: 'smooth' })
  }

  return {
    startingRecord,
    endingRecord,
    pageCount,
    handlePageChange,
    handleScrollToTop,
  }
}

export default useHiscoresPagination
