import { HiscoresControlsProps } from './HiscoresControls.types'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from '@ui/pagination'
import clsx from 'clsx'
import { ChangeEvent } from 'react'

const HiscoresControls = (props: HiscoresControlsProps) => {
  const { page, pageCount, handlePageChange } = props
  const currentPage = page ?? 1

  const handleClick = (newPage: number) => {
    if (newPage < 1 || newPage > pageCount) return
    handlePageChange({} as ChangeEvent<unknown>, newPage)
  }

  const getPageNumbers = (): (number | 'ellipsis')[] => {
    if (pageCount <= 5) return Array.from({ length: pageCount }, (_, i) => i + 1)

    if (currentPage <= 3) return [1, 2, 3, 'ellipsis', pageCount]
    if (currentPage >= pageCount - 2) return [1, 'ellipsis', pageCount - 2, pageCount - 1, pageCount]

    return [1, 'ellipsis', currentPage, 'ellipsis', pageCount]
  }

  return (
    <div className='mx-auto mt-4 flex items-center justify-center gap-7.5'>
      <Pagination>
        <PaginationContent className='flex-nowrap'>
          <PaginationItem>
            <PaginationPrevious
              href='#'
              onClick={e => {
                e.preventDefault()
                handleClick(currentPage - 1)
              }}
              className={clsx(currentPage === 1 && 'pointer-events-none opacity-50')}
            />
          </PaginationItem>
          {getPageNumbers().map((pageNum, index) =>
            pageNum === 'ellipsis' ? (
              <PaginationItem key={`ellipsis-${index}`}>
                <PaginationEllipsis />
              </PaginationItem>
            ) : (
              <PaginationItem key={pageNum}>
                <PaginationLink
                  href='#'
                  isActive={pageNum === currentPage}
                  onClick={e => {
                    e.preventDefault()
                    handleClick(pageNum)
                  }}
                  className={clsx(
                    'font-sans text-sm',
                    pageNum === currentPage && 'bg-primary-main hover:bg-primary-dark text-white',
                  )}
                >
                  {pageNum}
                </PaginationLink>
              </PaginationItem>
            ),
          )}
          <PaginationItem>
            <PaginationNext
              href='#'
              onClick={e => {
                e.preventDefault()
                handleClick(currentPage + 1)
              }}
              className={clsx(currentPage === pageCount && 'pointer-events-none opacity-50')}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}

export default HiscoresControls
