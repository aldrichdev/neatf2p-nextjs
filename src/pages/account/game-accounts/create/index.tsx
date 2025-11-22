import { BodyText } from '@atoms/BodyText'
import { ContentBlock } from '@atoms/ContentBlock'
import { Field } from '@atoms/Field'
import { FieldValidationMessage } from '@atoms/FieldValidationMessage'
import { Form } from '@atoms/Form'
import { FormButton } from '@atoms/FormButton/FormButton'
import { redirectTo } from '@helpers/window'
import { ChangeEvent, FormEvent, useState } from 'react'
import { hashPassword } from '@helpers/password'
import { UserIsLoggedIn } from '@helpers/users/users'
import { NotLoggedIn } from '@molecules/NotLoggedIn'
import { PageHeading } from '@atoms/PageHeading'
import { sanitizeRunescapePassword } from '@helpers/string/stringUtils'
import { handleForbiddenRedirect, sendApiRequest } from '@helpers/api/apiUtils'
import axios, { AxiosError } from 'axios'
import { renderHead } from '@helpers/renderUtils'
import { RulesAcceptanceCheckbox } from '@molecules/RulesAcceptanceCheckbox'
import { User } from '@globalTypes/User'
import { NullUser } from '@models/NullUser'
import { sessionOptions } from '@models/session'
import { getIronSession } from 'iron-session'
import { GetServerSideProps } from 'next'

type CreateGameAccountPageProps = {
  user: User
}

const CreateGameAccountPage = ({ user }: CreateGameAccountPageProps) => {
  const [accountName, setAccountName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [rulesAgreedTo, setRulesAgreedTo] = useState<boolean>()
  const [validationError, setValidationError] = useState('')
  const [submitDisabled, setSubmitDisabled] = useState(false)

  const handleAccountNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAccountName(event.target.value)
    setValidationError('')
  }

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
    setValidationError('')
  }

  const handleConfirmPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(event.target.value)
    setValidationError('')
  }

  const handleRulesCheck = () => {
    setRulesAgreedTo(!rulesAgreedTo)
  }

  const handleGameAccountCreation = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitDisabled(true)

    // Confirm passwords match
    if (password != confirmPassword) {
      setSubmitDisabled(false)
      setValidationError('Passwords do not match.')
      return
    }

    // Fix password so RSC recognizes it
    const fixedPassword = sanitizeRunescapePassword(password)

    // Hash password
    const { hashedPassword } = hashPassword(fixedPassword, true)

    axios.get('https://api.ipify.org/?format=json').then(response => {
      // Create account
      sendApiRequest('POST', '/api/createPlayerRecord', {
        userId: user.id,
        accountName,
        password: hashedPassword,
        userIp: response?.data?.ip,
      })
        .then(response => {
          if (typeof response?.data === 'number') {
            const playerId = response?.data

            // Now we need to create the other records. New accounts are not playable without these.
            sendApiRequest('POST', '/api/createPlayerSkillRecords', {
              userId: user.id,
              playerId,
            })
              .then(response => {
                if (typeof response?.data === 'number') {
                  redirectTo(`/account/game-accounts/create/success?accountName=${accountName}`)
                }
              })
              .catch((error: AxiosError<string>) => {
                setSubmitDisabled(false)
                setValidationError(error?.response?.data || '')
                handleForbiddenRedirect(error)
              })
          }
        })
        .catch((error: AxiosError<string>) => {
          setSubmitDisabled(false)
          setValidationError(error?.response?.data || '')
          handleForbiddenRedirect(error)
        })
    })
  }

  return (
    <>
      {renderHead('Create Game Account', 'Create game accounts for the Neat F2P server here.')}
      {!UserIsLoggedIn(user) ? (
        <NotLoggedIn />
      ) : process.env.NEXT_PUBLIC_GAME_ACCOUNTS_DISABLE_CREATION === 'true' ? (
        <ContentBlock>
          <PageHeading>Temporarily Disabled</PageHeading>
          <BodyText variant='body' bodyTextAlign='center'>
            Game account creations are temporarily disabled until further notice.
          </BodyText>
        </ContentBlock>
      ) : (
        <ContentBlock>
          <PageHeading>Create Game Account</PageHeading>
          <BodyText variant='body'>
            Game account names must be 12 characters or less. You are allowed spaces within your name, but any spaces at
            the start or end of your name will be removed upon account creation.
          </BodyText>
          <Form onSubmit={handleGameAccountCreation}>
            <Field
              required
              id='account-name'
              label='Account Name'
              type='text'
              variant='standard'
              onChange={handleAccountNameChange}
              inputProps={{ maxLength: 12 }}
              autoComplete='username'
            />
            <Field
              required
              id='password'
              label='Password'
              type='password'
              variant='standard'
              onChange={handlePasswordChange}
              inputProps={{ maxLength: 20 }}
              autoComplete='new-password'
            />
            <Field
              required
              id='confirmPassword'
              label='Confirm Password'
              type='password'
              variant='standard'
              onChange={handleConfirmPasswordChange}
              inputProps={{ maxLength: 20 }}
              autoComplete='new-password'
            />
            <FieldValidationMessage>{validationError}</FieldValidationMessage>
            <RulesAcceptanceCheckbox onChange={handleRulesCheck} />
            <FormButton variant='contained' type='submit' disabled={submitDisabled}>
              Submit
            </FormButton>
          </Form>
        </ContentBlock>
      )}
    </>
  )
}

export default CreateGameAccountPage

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getIronSession(req, res, sessionOptions)
  const user: User = session?.user || NullUser

  return {
    props: {
      user: JSON.parse(JSON.stringify(user)),
    },
  }
}
