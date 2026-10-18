import parse from 'html-react-parser'

interface ReadMoreProps {
  children: string
}

/** A component that truncates long text. */
const ReadMore = (props: ReadMoreProps) => {
  const { children } = props

  return (
    <span className='news-post-detail-body'>
      {children.length > 300 ? <>{parse(`${children.slice(0, 300)}...`)}</> : parse(children)}
    </span>
  )
}

export default ReadMore
