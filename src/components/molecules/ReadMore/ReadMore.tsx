import parse from 'html-react-parser'
import { HoverUnderlineLink } from '@atoms/HoverUnderlineLink'

interface ReadMoreProps {
  linkHref: string
  children: string
}

const ReadMore = (props: ReadMoreProps) => {
  const { linkHref, children } = props

  return (
    <span>
      {children.length > 300 ? (
        <>
          {parse(`${children.slice(0, 300)}...`)}
          <HoverUnderlineLink href={linkHref}>Read post {'>>'}</HoverUnderlineLink>
        </>
      ) : (
        parse(children)
      )}
    </span>
  )
}

export default ReadMore
