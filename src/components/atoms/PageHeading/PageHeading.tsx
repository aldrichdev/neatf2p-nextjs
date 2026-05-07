import { PageHeadingProps } from './PageHeading.types'
import { Heading } from './PageHeading.styled'

const PageHeading = (props: PageHeadingProps) => {
  const { children, marginBottom, noTopPadding } = props

  return (
    <Heading variant='h2' sx={{ marginBottom }} noTopPadding={noTopPadding}>
      {children}
    </Heading>
  )
}

export default PageHeading
