import { ChangeEvent, FormEvent, useState } from 'react'
import { PlayerDataRow } from '@globalTypes/Database/PlayerDataRow'
import { Modal } from '@molecules/Modal'
import { Field } from '@atoms/Field'
import { handleForbiddenRedirect, sendApiRequest } from '@helpers/api/apiUtils'
import { User } from '@globalTypes/User'
import { AxiosError } from 'axios'
import { RenameAccountModalBody } from '@molecules/RenameAccountModalBody'

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
  const playerRenamedOnce = account.former_name?.length > 0
  const playerRenamedMaximumAmount = playerRenamedOnce && account.former_name.startsWith('#')

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

  const updateUsername = (currentName: string, newName: string) => {
    sendApiRequest('POST', '/api/updateGameAccountUsername', {
      userId: user?.id,
      accountId: account.id,
      currentName,
      newName,
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
        } else {
          setValidationError(error?.response?.data || '')
        }

        handleForbiddenRedirect(error)
      })
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const newAccountName = newName.trim()

    updateUsername(account.username, newAccountName)
  }

  const handleRestoreUsername = () => {
    // For the current `account`, change its username to `account.former_name` and its former_name to `#account.username`
    // (hash indicates they have restored once and used maximum renames)
    updateUsername(`#${account.username}`, account.former_name)
  }

  if (!open) return null

  return (
    <Modal
      open={open}
      handleClose={handleClose}
      heading='Rename Account'
      body={
        <RenameAccountModalBody
          account={account}
          playerRenamedOnce={playerRenamedOnce}
          playerRenamedMaximumAmount={playerRenamedMaximumAmount}
          onRestoreUsername={handleRestoreUsername}
          restoreSuccessMessage={successMessage}
        />
      }
      hasForm={!playerRenamedOnce}
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
