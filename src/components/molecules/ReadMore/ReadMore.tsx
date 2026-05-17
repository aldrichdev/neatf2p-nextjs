import parse from 'html-react-parser'
import { StandardLink } from '@atoms/StandardLink'

interface ReadMoreProps {
  linkHref: string
  children: string
}

/** A component that truncates long text and includes a "Read post >>" link at the end. */
const ReadMore = (props: ReadMoreProps) => {
  const { linkHref, children } = props

  return (
    <span>
      {children.length > 300 ? (
        <>
          {parse(`${children.slice(0, 300)}...`)}
          <StandardLink href={linkHref} hoverUnderline>
            Read post {'>>'}
          </StandardLink>
        </>
      ) : (
        parse(children)
      )}
    </span>
  )
}

export default ReadMore
