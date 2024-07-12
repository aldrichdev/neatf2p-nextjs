import { push } from '@helpers/router'
import { useRouter } from 'next/router'

const useHiscoresPagination = (setPage: (page: number) => void) => {
  const router = useRouter()

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
    router.query.page = value.toString()
    push(router, '/npc-hiscores', router.query)
  }

  const handleScrollToTop = () => {
    window.scrollTo({ top: 525, behavior: 'smooth' })
  }

  return { handlePageChange, handleScrollToTop }
}

export default useHiscoresPagination
