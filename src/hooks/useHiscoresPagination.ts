import { push } from '@utils/router'
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
    push(router, isNpcHiscores ? '/npc-hiscores' : '/hiscores', router.query)
  }

  return {
    startingRecord,
    endingRecord,
    pageCount,
    handlePageChange,
  }
}

export default useHiscoresPagination
