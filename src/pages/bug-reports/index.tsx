import { BodyText } from '@atoms/BodyText'
import { sharedStyles } from '@consts/styles/shared'
import { FieldValidationMessage } from '@atoms/FieldValidationMessage'
import { Form } from '@atoms/Form'
import { PageHeading } from '@atoms/PageHeading'
import { BugType } from '@globalTypes/BugType'
import { User } from '@globalTypes/User'
import { renderHead } from '@utils/renderUtils'
import { UserIsLoggedIn } from '@utils/users/users'
import { NullUser } from '@models/NullUser'
import { sessionOptions } from '@models/session'
import { NotLoggedIn } from '@molecules/NotLoggedIn'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@ui/select'
import { getIronSession } from 'iron-session'
import { GetServerSideProps } from 'next'
import { Octokit } from 'octokit'
import { ChangeEvent, FormEvent, ReactNode, useState } from 'react'
import { Textarea } from '@ui/textarea'
import { Input } from '@ui/input'
import { Button } from '@ui/button'
import { StandardLink } from '@atoms/StandardLink'

type BugReportsPageProps = {
  user: User
}

const BugReportsPage = ({ user }: BugReportsPageProps) => {
  const [bugTitle, setBugTitle] = useState('')
  const [bugDescription, setBugDescription] = useState('')
  const [bugType, setBugType] = useState<BugType>('Game')
  const [buttonDisabled, setButtonDisabled] = useState(false)
  const [validationMessage, setValidationMessage] = useState<ReactNode>(<></>)
  const [validationMessageColor, setValidationMessageColor] = useState<'green' | 'red'>('red')

  const handleBugTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setBugTitle(event.target.value)
  }

  const handleBugDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setBugDescription(event.target.value)
  }

  const handleBugCreation = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setButtonDisabled(true)

    const repoOwner = 'aldrichdev'
    const repo = ['Game', 'Android'].includes(bugType) ? 'Neat-F2P' : 'neatf2p-nextjs'
    const issuesPageUrl = `https://github.com/${repoOwner}/${repo}/issues`

    const octokit = new Octokit({
      auth: process.env.NEXT_PUBLIC_GITHUB_API_TOKEN,
    })

    // Send to GitHub
    octokit
      .request(`POST /repos/${repoOwner}/${repo}/issues`, {
        owner: repoOwner,
        repo,
        title: bugTitle,
        body: `Reported by ${user.username}: \r\n \r\n ${bugDescription}`,
        assignees: [repoOwner],
        labels: ['bug', bugType],
        headers: {
          'X-GitHub-Api-Version': '2022-11-28',
        },
      })
      .then(() => {
        setValidationMessage(
          <p>
            Your bug report has been submitted successfully! You can see it here:{' '}
            <StandardLink href={issuesPageUrl} target='_blank'>
              {issuesPageUrl}
            </StandardLink>
            .
          </p>,
        )
        setValidationMessageColor('green') // TODO: This looks bad next to the standardlink coloring..
      })
      .catch(error => {
        setValidationMessage(
          <p>An error occurred. The bug was not submitted. Please contact the administrator. Message: {error}</p>,
        )
        setValidationMessageColor('red')
      })
  }

  return (
    <>
      {renderHead(
        'Report a Bug',
        "Use the form on this page to submit a bug. Don't abuse this form, it could get you in trouble.",
      )}
      {!UserIsLoggedIn(user) ? (
        <NotLoggedIn />
      ) : (
        <div className={sharedStyles.defaultContainer}>
          <PageHeading>Report a Bug</PageHeading>
          <BodyText>
            Use the below form to submit a bug. Don&apos;t abuse this form, it could get you in trouble.
          </BodyText>
          <Form onSubmit={handleBugCreation} desktopFullWidth>
            <Input
              required
              id='title'
              placeholder='Short summary of the bug'
              maxLength={100}
              onChange={handleBugTitleChange}
            />
            <Textarea
              required
              id='description'
              placeholder='Describe the bug. If you can provide steps to reproduce it, please do'
              rows={5}
              maxLength={10000}
              onChange={handleBugDescriptionChange}
            />
            <Select value={bugType} onValueChange={value => setBugType(value as BugType)}>
              <SelectTrigger className='w-full text-left'>
                <SelectValue placeholder='Bug Type' />
              </SelectTrigger>
              <SelectContent position='popper'>
                <SelectItem value='Game' className='hover:bg-primary-light cursor-pointer'>
                  Game
                </SelectItem>
                <SelectItem value='Website' className='hover:bg-primary-light cursor-pointer'>
                  Website
                </SelectItem>
                <SelectItem value='Android' className='hover:bg-primary-light cursor-pointer'>
                  Android Client
                </SelectItem>
                <SelectItem value='WebClient' className='hover:bg-primary-light cursor-pointer'>
                  Web Client
                </SelectItem>
              </SelectContent>
            </Select>
            <Button type='submit' disabled={buttonDisabled}>
              Submit
            </Button>
            <FieldValidationMessage color={validationMessageColor}>{validationMessage}</FieldValidationMessage>
          </Form>
        </div>
      )}
    </>
  )
}

export default BugReportsPage

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getIronSession(req, res, sessionOptions)

  // We need to coalesce to `NullUser` here so that we don't try to parse `undefined`
  const user: User = session?.user || NullUser

  return {
    props: {
      user: JSON.parse(JSON.stringify(user)),
    },
  }
}
