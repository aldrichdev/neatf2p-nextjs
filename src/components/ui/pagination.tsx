import { cn } from '@utils/cn'
import { Button } from '@ui/button'
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react'

function Pagination({ className, ...props }: React.ComponentProps<'nav'>) {
  return (
    <nav
      role='navigation'
      aria-label='pagination'
      data-slot='pagination'
      className={cn('mx-auto flex w-full justify-center', className)}
      {...props}
    />
  )
}

function PaginationContent({ className, ...props }: React.ComponentProps<'ul'>) {
  return (
    <ul
      data-slot='pagination-content'
      className={cn('m-0 flex list-none items-center gap-1 p-0!', className)}
      {...props}
    />
  )
}

function PaginationItem({ ...props }: React.ComponentProps<'li'>) {
  return <li data-slot='pagination-item' className='list-none' {...props} />
}

type PaginationLinkProps = {
  isActive?: boolean
} & Pick<React.ComponentProps<typeof Button>, 'size'> &
  React.ComponentProps<'a'>

function PaginationLink({ className, isActive, size = 'icon', ...props }: PaginationLinkProps) {
  return (
    <Button
      asChild
      variant={isActive ? 'default' : 'ghost'}
      size={size}
      className={cn(
        'size-9 rounded-md font-sans text-[14px]',
        isActive && 'bg-primary-main hover:bg-primary-dark text-white',
        className,
      )}
    >
      <a aria-current={isActive ? 'page' : undefined} data-slot='pagination-link' data-active={isActive} {...props} />
    </Button>
  )
}

function PaginationPrevious({
  className,
  text = 'Previous',
  ...props
}: React.ComponentProps<typeof PaginationLink> & { text?: string }) {
  return (
    <PaginationLink
      aria-label='Go to previous page'
      size='default'
      className={cn('w-fit gap-1 px-3', className)}
      {...props}
    >
      <ChevronLeft className='size-4' />
      <span className='hidden sm:block'>{text}</span>
    </PaginationLink>
  )
}

function PaginationNext({
  className,
  text = 'Next',
  ...props
}: React.ComponentProps<typeof PaginationLink> & { text?: string }) {
  return (
    <PaginationLink
      aria-label='Go to next page'
      size='default'
      className={cn('w-fit gap-1 px-3', className)}
      {...props}
    >
      <span className='hidden sm:block'>{text}</span>
      <ChevronRight className='size-4' />
    </PaginationLink>
  )
}

function PaginationEllipsis({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      aria-hidden
      data-slot='pagination-ellipsis'
      className={cn('text-muted-foreground flex size-9 items-center justify-center', className)}
      {...props}
    >
      <MoreHorizontal className='size-4' />
      <span className='sr-only'>More pages</span>
    </span>
  )
}

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
}
