import { cn } from '@utils/cn'
import { PageHeadingProps } from './PageHeading.types'

const PageHeading = (props: PageHeadingProps) => {
  const { children, className } = props

  return <h2 className={cn('text-center', className)}>{children}</h2>
}

export default PageHeading
