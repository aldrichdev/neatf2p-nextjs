import { PageHeadingProps } from './PageHeading.types'
import { Heading } from './PageHeading.styled'

const PageHeading = (props: PageHeadingProps) => {
  const { children } = props

  return <Heading variant='h2'>{children}</Heading>
}

export default PageHeading
