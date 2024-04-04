import { BodyText } from '@atoms/BodyText'
import { ContentBlock } from '@atoms/ContentBlock'
import { Field } from '@atoms/Field'
import { FieldValidationMessage } from '@atoms/FieldValidationMessage'
import { Form } from '@atoms/Form'
import { FormButton } from '@atoms/FormButton/FormButton'
import { PageHeading } from '@atoms/PageHeading'
import { BugType } from '@globalTypes/BugType'
import { UserIsLoggedIn } from '@helpers/users/users'
import useAuthentication from '@hooks/useAuthentication'
import { NotLoggedIn } from '@molecules/NotLoggedIn'
import { Spinner } from '@molecules/Spinner'
import { InputLabel, Select, SelectChangeEvent } from '@mui/material'
import { BugTypeDropdown, BugTypeMenuItem, IssuesLink } from '@styledPages/ReportABug.styled'
import Head from 'next/head'
import { Octokit } from 'octokit'
import { ChangeEvent, FormEvent, ReactNode, useState } from 'react'
import { SharedBrowserTitle } from 'src/constants'

const BugReportsPage = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [bugTitle, setBugTitle] = useState('')
  const [bugDescription, setBugDescription] = useState('')
  const [bugType, setBugType] = useState<BugType>('Game')
  const [buttonDisabled, setButtonDisabled] = useState(false)
  const [validationMessage, setValidationMessage] = useState<ReactNode>(<></>)
  const [validationMessageColor, setValidationMessageColor] = useState('')
  const user = useAuthentication(setIsLoading)

  const handleBugTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setBugTitle(event.target.value)
  }

  const handleBugDescriptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    setBugDescription(event.target.value)
  }

  const handleBugTypeChange = (event: SelectChangeEvent<BugType>) => {
    setBugType(event.target.value as BugType)
  }

  const handleBugCreation = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setButtonDisabled(true)

    const repoOwner = 'aldrichdev'
    const repo = bugType === 'Game' ? 'Neat-F2P' : 'neatf2p-nextjs'
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
        labels: ['bug'],
        headers: {
          'X-GitHub-Api-Version': '2022-11-28',
        },
      })
      .then(() => {
        setValidationMessage(
          <p>
            Your bug report has been submitted successfully! You can see it here:{' '}
            <IssuesLink href={issuesPageUrl} target='_blank'>
              {issuesPageUrl}
            </IssuesLink>
            .
          </p>,
        )
        setValidationMessageColor('green')
      })
      .catch(error => {
        setValidationMessage(
          <p>An error occurred. The bug was not submitted. Please contact the administrator. Message: {error}</p>,
        )
        setValidationMessageColor('red')
      })
  }

  if (isLoading) {
    return <Spinner />
  }

  if (!UserIsLoggedIn(user)) {
    return <NotLoggedIn />
  }

  return (
    <>
      <Head>
        <title>Report a Bug | {SharedBrowserTitle}</title>
      </Head>
      <ContentBlock>
        <PageHeading>Report a Bug</PageHeading>
        <BodyText variant='body'>
          Use the below form to submit a bug. Don&apos;t abuse this form, it could get you in trouble.
        </BodyText>
        <Form onSubmit={handleBugCreation} desktopWidth='100%'>
          <Field
            required
            id='title'
            label='Title'
            placeholder='Short summary of the bug'
            variant='outlined'
            inputProps={{ maxLength: 100 }}
            onChange={handleBugTitleChange}
          />
          <Field
            required
            id='description'
            label='Description'
            placeholder='Describe the bug. If you can provide steps to reproduce it, please do'
            variant='outlined'
            multiline
            rows={5}
            inputProps={{ maxLength: 10000 }}
            onChange={handleBugDescriptionChange}
          />
          <BugTypeDropdown>
            <InputLabel id='label-bug-type'>Bug Type</InputLabel>
            <Select
              labelId='label-bug-type'
              id='bug-type'
              label='Bug Type'
              value={bugType}
              onChange={handleBugTypeChange}
            >
              <BugTypeMenuItem value='Game'>Game</BugTypeMenuItem>
              <BugTypeMenuItem value='Website'>Website</BugTypeMenuItem>
            </Select>
          </BugTypeDropdown>
          <FormButton variant='contained' type='submit' disabled={buttonDisabled}>
            Submit
          </FormButton>
          <FieldValidationMessage color={validationMessageColor}>{validationMessage}</FieldValidationMessage>
        </Form>
      </ContentBlock>
    </>
  )
}

export default BugReportsPage
