import { BodyText } from '@atoms/BodyText'
import { ContentBlock } from '@atoms/ContentBlock'
import { InlineLink } from '@atoms/InlineLink'
import { PageHeading } from '@atoms/PageHeading'
import { renderHead } from '@helpers/renderUtils'

export default function NotFound() {
  return (
    <>
      {renderHead('Page Not Found')}
      <ContentBlock>
        <PageHeading>Nothing Interesting Happens.</PageHeading>
        <BodyText variant='body' component='div' bodyTextAlign='center'>
          <>
            <img src='/img/Rune Kite Shield.png' alt='Rune Kite Shield' />
            <p>That&apos;s a 404. We couldn&apos;t find the page you were looking for.</p>
            <p>
              <InlineLink href='/'>{'<'} Return home</InlineLink>
            </p>
          </>
        </BodyText>
      </ContentBlock>
    </>
  )
}
