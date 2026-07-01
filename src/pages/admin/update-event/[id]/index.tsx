import { MustBeAdminBlock } from '@molecules/MustBeAdminBlock'
import { PageHeading } from '@atoms/PageHeading'
import { renderHead } from '@utils/renderUtils'
import { User } from '@globalTypes/User'
import { NullUser } from '@models/NullUser'
import { sessionOptions } from '@models/session'
import { getIronSession } from 'iron-session'
import { GetServerSideProps } from 'next'
import { getWebsiteBaseUrl } from '@utils/envUtils'
import { handleForbiddenRedirect, sendApiRequest } from '@utils/api/apiUtils'
import { AxiosError } from 'axios'
import { EventSubmitProps } from '@molecules/EventForm/EventForm.types'
import { redirectTo } from '@utils/window'
import { EventForm } from '@molecules/EventForm'
import { DatabaseEvent } from '@globalTypes/event'
import { sharedStyles } from '@consts/styles/shared'

type UpdateEventPageProps = {
  /** The event that is being updated. */
  event: DatabaseEvent
  user: User
}

const UpdateEventPage = ({ event, user }: UpdateEventPageProps) => {
  const handleUpdateEvent = (props: EventSubmitProps) => {
    const { Id, Title, StartDate, EndDate, RelativeUrl, Location, EmojiName, Recurring, RecursEvery, setSubmitResult } =
      props

    if (event?.Id === null) {
      return
    }

    sendApiRequest('POST', '/api/upsertEvent', {
      userId: user.id,
      id: Id,
      title: Title,
      startDate: StartDate,
      endDate: EndDate,
      relativeUrl: RelativeUrl,
      location: Location,
      emojiName: EmojiName === '' ? null : EmojiName,
      recurring: Recurring || 0,
      recursEvery: RecursEvery === '' ? null : RecursEvery,
    })
      .then(response => {
        setSubmitResult({
          answer: response?.data,
          code: response?.data?.includes('Success') ? 'green' : 'red',
        })

        // If response was successful, redirect to the account page after a delay
        if (response?.data?.includes('Success')) {
          setTimeout(() => {
            redirectTo('/account')
          }, 5000)
        }
      })
      .catch((error: AxiosError<string>) => {
        setSubmitResult({
          answer: error?.response?.data || '',
          code: 'red',
        })

        handleForbiddenRedirect(error)
      })
  }

  return (
    <>
      {renderHead('Update Event')}
      {!user?.isAdmin ? (
        <MustBeAdminBlock />
      ) : (
        <div className={sharedStyles.defaultContainer}>
          <PageHeading>Update an Event</PageHeading>
          <EventForm websiteEvent={event} onSubmitForm={handleUpdateEvent} />
        </div>
      )}
    </>
  )
}

export default UpdateEventPage

export const getServerSideProps: GetServerSideProps = async ({ req, res, params }) => {
  const fetchUrl = `${getWebsiteBaseUrl()}/api/getEvents${params?.id ? `?id=${params.id}` : ''}`
  const response = await fetch(fetchUrl)
  const events = await response.json()
  const session = await getIronSession(req, res, sessionOptions)
  const user: User = session?.user || NullUser

  if (events.length === 1) {
    return {
      props: {
        event: events[0],
        user: JSON.parse(JSON.stringify(user)),
      },
    }
  }

  return {
    notFound: true,
  }
}
