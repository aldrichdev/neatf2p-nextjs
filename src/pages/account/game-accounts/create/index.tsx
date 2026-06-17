import { BodyText } from '@atoms/BodyText'
import { sharedStyles } from '@consts/styles/shared'
import { Input } from '@ui/input'
import { FieldValidationMessage } from '@atoms/FieldValidationMessage'
import { Form } from '@atoms/Form'
import { redirectTo } from '@utils/window'
import { ChangeEvent, FormEvent, useState } from 'react'
import { hashPassword } from '@utils/password'
import { UserIsLoggedIn } from '@utils/users/users'
import { NotLoggedIn } from '@molecules/NotLoggedIn'
import { PageHeading } from '@atoms/PageHeading'
import { sanitizeRunescapePassword } from '@utils/string/stringUtils'
import { handleForbiddenRedirect, sendApiRequest } from '@utils/api/apiUtils'
import axios, { AxiosError } from 'axios'
import { renderHead } from '@utils/renderUtils'
import { RulesAcceptanceCheckbox } from '@molecules/RulesAcceptanceCheckbox'
import { User } from '@globalTypes/User'
import { NullUser } from '@models/NullUser'
import { sessionOptions } from '@models/session'
import { getIronSession } from 'iron-session'
import { GetServerSideProps } from 'next'
import { Button } from '@ui/button'

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
        <div className={sharedStyles.defaultContainer}>
          <PageHeading>Temporarily Disabled</PageHeading>
          <BodyText bodyTextAlign='center'>
            Game account creations are temporarily disabled until further notice.
          </BodyText>
        </div>
      ) : (
        <div className={sharedStyles.defaultContainer}>
          <PageHeading>Create Game Account</PageHeading>
          <BodyText>
            Game account names must be 12 characters or less. You are allowed spaces within your name, but any spaces at
            the start or end of your name will be removed upon account creation.
          </BodyText>
          <Form onSubmit={handleGameAccountCreation}>
            <Input
              required
              id='account-name'
              placeholder='Account Name'
              type='text'
              onChange={handleAccountNameChange}
              maxLength={12}
              autoComplete='username'
            />
            <Input
              required
              id='password'
              placeholder='Password'
              type='password'
              onChange={handlePasswordChange}
              maxLength={20}
              autoComplete='new-password'
            />
            <Input
              required
              id='confirmPassword'
              placeholder='Confirm Password'
              type='password'
              onChange={handleConfirmPasswordChange}
              maxLength={20}
              autoComplete='new-password'
            />
            <FieldValidationMessage>{validationError}</FieldValidationMessage>
            <RulesAcceptanceCheckbox onChange={handleRulesCheck} />
            <Button type='submit' disabled={submitDisabled}>
              Submit
            </Button>
          </Form>
        </div>
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
