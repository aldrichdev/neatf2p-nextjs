import { PageHeading } from '@atoms/PageHeading'
import { BackToLink } from '@molecules/BackToLink'
import { renderHead } from '@utils/renderUtils'
import { sharedStyles } from '@consts/styles/shared'

export default function NotFound() {
  return (
    <>
      {renderHead('Page Not Found')}
      <div className={sharedStyles.defaultContainer}>
        <PageHeading>Nothing Interesting Happens.</PageHeading>
        <div className='flex flex-wrap justify-center gap-6 text-left md:text-center'>
          <img src='/img/Rune Kite Shield.png' alt='Rune Kite Shield' />
          <p className='basis-full'>That&apos;s a 404. We couldn&apos;t find the page you were looking for.</p>
        </div>
        <BackToLink href='/' className='mt-0 text-base'>
          ← Return Home
        </BackToLink>
      </div>
    </>
  )
}
