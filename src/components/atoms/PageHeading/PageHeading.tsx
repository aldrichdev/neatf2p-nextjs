import { PageHeadingProps } from './PageHeading.types'
import { Heading } from './PageHeading.styled'

const PageHeading = (props: PageHeadingProps) => {
  const { children, marginBottom } = props

  return (
    <Heading variant='h2' sx={{ marginBottom }}>
      {children}
    </Heading>
  )
}

export default PageHeading
