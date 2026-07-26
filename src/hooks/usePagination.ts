import { useState } from 'react'

/** A hook for basic pagination logic, showing 10 results at a time. */
const usePagination = (recordCount: number) => {
  const [page, setPage] = useState(1)
  const resultsPerPage = 10
  const pageCount = Math.ceil(recordCount / resultsPerPage)
  const startingRecord = page === 1 ? 0 : (page - 1) * resultsPerPage
  const endingRecord = page == 1 ? resultsPerPage : startingRecord + resultsPerPage

  return {
    startingRecord,
    endingRecord,
    page,
    setPage,
    pageCount,
  }
}

export default usePagination
