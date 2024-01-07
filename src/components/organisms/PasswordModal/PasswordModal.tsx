import { ChangeEvent, FormEvent, useState } from 'react'
import { PlayerDataRow } from '@globalTypes/Database/PlayerDataRow'
import axios from 'axios'
import { Field } from '@atoms/Field'
import { Modal } from '@molecules/Modal'
import { hashPassword } from '@helpers/password'

type PasswordModalProps = {
  account: PlayerDataRow
  open: boolean
  setOpen: (open: boolean) => void
}

const PasswordModal = (props: PasswordModalProps) => {
  const { account, open, setOpen } = props
  const [newPassword, setNewPassword] = useState<string>('')
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>('')
  const [validationError, setValidationError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  if (open) {
    // Prevent scrolling
    document.body.style.overflow = 'hidden'
  }

  const handleClose = () => {
    setOpen(false)
    document.body.style.overflow = 'unset'
  }

  const handleNewPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewPassword(event.target.value)
    setValidationError('')
  }

  const handleConfirmNewPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setConfirmNewPassword(event.target.value)
    setValidationError('')
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    // Make sure passwords match
    if (newPassword !== confirmNewPassword) {
      setValidationError('Passwords must match.')
      return
    }

    // Hash new password.
    const { hashedPassword } = hashPassword(newPassword, true)

    axios
      .post('/api/updateGameAccountPassword', {
        accountId: account.id,
        newPassword: hashedPassword,
      })
      .then(response => {
        if (typeof response?.data === 'number') {
          setSuccessMessage('Your password has been updated successfully! This window will now close...')
          setTimeout(() => {
            handleClose()
          }, 3000)
        } else {
          const errorMessage = `Non-number response type in PasswordModal: ${response?.data}`
          console.log(errorMessage)
        }
      })
  }

  if (!open) return null

  return (
    <Modal
      open={open}
      handleClose={handleClose}
      heading='Update Password'
      body={<>Please log {account.username} out of the game before continuing.</>}
      hasForm
      handleSubmit={handleSubmit}
      renderFields={() => (
        <>
          <Field type='text' label='Account' value={account.username} disabled />
          <Field type='password' label='New Password' required onChange={handleNewPasswordChange} />
          <Field type='password' label='Confirm New Password' required onChange={handleConfirmNewPasswordChange} />
        </>
      )}
      formValidationError={validationError}
      formSuccessMessage={successMessage}
    />
  )
}

export default PasswordModal
