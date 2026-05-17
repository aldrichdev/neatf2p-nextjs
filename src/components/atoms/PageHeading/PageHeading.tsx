import { PageHeadingProps } from './PageHeading.types'

const PageHeading = (props: PageHeadingProps) => {
  const { children } = props

  return <h2 className='text-center'>{children}</h2>
}

export default PageHeading
