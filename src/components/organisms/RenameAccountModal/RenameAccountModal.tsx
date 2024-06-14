import { ChangeEvent, FormEvent, useState } from 'react'
import { PlayerDataRow } from '@globalTypes/Database/PlayerDataRow'
import { Warning } from './RenameAccountModal.styled'
import { Modal } from '@molecules/Modal'
import { Field } from '@atoms/Field'
import { handleForbiddenRedirect, sendApiRequest } from '@helpers/api/apiUtils'
import { User } from '@globalTypes/User'
import { AxiosError } from 'axios'
import { AxiosErrorResponse } from '@globalTypes/AxiosErrorResponse'

type RenameAccountModalProps = {
  account: PlayerDataRow
  open: boolean
  setOpen: (open: boolean) => void
  user: User | undefined
}

const RenameAccountModal = (props: RenameAccountModalProps) => {
  const { account, open, setOpen, user } = props
  const [newName, setNewName] = useState<string>('')
  const [validationError, setValidationError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const playerAlreadyRenamed = account.former_name?.length > 0

  if (open) {
    // Prevent scrolling
    document.body.style.overflow = 'hidden'
  }

  const handleNewNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewName(event.target.value)
    setValidationError('')
  }

  const handleClose = () => {
    setOpen(false)
    document.body.style.overflow = 'unset'
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const newAccountName = newName.trim()

    // Check for names that are just spaces
    if (newAccountName === '') {
      setValidationError('You cannot have a username with only spaces.')
      return
    }

    // Check for the same name
    if (newAccountName === account.username) {
      setValidationError('The account name entered is the same as your current name.')
      return
    }

    sendApiRequest('POST', '/api/updateGameAccountUsername', {
      userId: user?.id,
      accountId: account.id,
      currentName: account.username,
      newName: newAccountName,
    })
      .then(response => {
        if (typeof response?.data === 'number') {
          setSuccessMessage('Your account has been renamed successfully! This page will now refresh.')
          setTimeout(() => {
            if (typeof window !== 'undefined') {
              location.reload()
            }
          }, 3000)
        } else {
          const errorMessage = `Non-number response type in RenameAccountModal: ${response?.data}`
          console.log(errorMessage)
        }
      })
      .catch((error: AxiosError<string>) => {
        if (error?.response?.data?.includes('No rows affected')) {
          // Usually means they tried to rename to an account that is taken in a different case and they don't own it
          // (There cannot be multiple account names that only differ in casing, only one can login)
          setValidationError('The new name entered is taken. Please try another one.')
          return
        }

        handleForbiddenRedirect(error?.message)
      })
  }

  if (!open) return null

  return (
    <Modal
      open={open}
      handleClose={handleClose}
      heading='Rename Account'
      body={
        playerAlreadyRenamed ? (
          <>
            <p>
              {' '}
              You have already renamed your character ({account.username}) once, so you cannot rename again. If you
              think this is a mistake, please contact the admin directly over Discord private message.
            </p>
            <p>Your previous name was {account.former_name}.</p>
          </>
        ) : (
          <>
            <strong>Please log {account.username} out of the game before continuing.</strong>{' '}
            <Warning>You can only rename an account once</Warning>, so please choose wisely when picking a new account
            name. Any spaces at the beginning or end of your new name will not be counted, but spaces within are fine.
          </>
        )
      }
      hasForm={!playerAlreadyRenamed}
      handleSubmit={handleSubmit}
      renderFields={() => (
        <>
          <Field type='text' label='Current Name' disabled value={account.username} />
          <Field type='text' label='New Name' required onChange={handleNewNameChange} inputProps={{ maxLength: 12 }} />
        </>
      )}
      formValidationError={validationError}
      formSuccessMessage={successMessage}
    />
  )
}

export default RenameAccountModal
