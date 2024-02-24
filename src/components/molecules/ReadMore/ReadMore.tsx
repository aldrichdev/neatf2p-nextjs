import { Text, ReadMoreLink } from './ReadMore.styled'
import parse from 'html-react-parser'

interface ReadMoreProps {
  linkHref: string
  children: string
}

const ReadMore = (props: ReadMoreProps) => {
  const { linkHref, children } = props

  return (
    <Text>
      {children.length > 300 ? (
        <>
          {parse(`${children.slice(0, 300)}...`)}
          <ReadMoreLink href={linkHref}>Read post {'>>'}</ReadMoreLink>
        </>
      ) : (
        parse(children)
      )}
    </Text>
  )
}

export default ReadMore
