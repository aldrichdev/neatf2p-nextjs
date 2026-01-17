import { BodyText } from '@atoms/BodyText'
import Button from '@mui/material/Button'
import { useState } from 'react'
import { Warning } from './RenameAccountModalBody.styled'
import { RenameAccountModalBodyProps } from './RenameAccountModalBody.types'

const RenameAccountModalBody = (props: RenameAccountModalBodyProps) => {
  const { account, playerRenamedOnce, playerRenamedMaximumAmount, onRestoreUsername, restoreSuccessMessage } = props
  const [restoreButtonDisabled, setRestoreButtonDisabled] = useState<boolean>()

  const handleRestore = () => {
    setRestoreButtonDisabled(true)
    onRestoreUsername()
  }

  if (playerRenamedMaximumAmount) {
    // # symbols are omitted since # is a special symbol added by the website to denote maximum rename attempts.
    return (
      <>
        <p>
          You have already renamed your character (<code>{account.username}</code>) once and changed it back once, so
          you cannot rename again. If you think this is a mistake, please contact the admin directly over Discord
          private message.
        </p>
        <p>
          Your previous name was <code>{account.former_name.replace('#', '')}</code>.
        </p>
      </>
    )
  }

  if (playerRenamedOnce) {
    return (
      <>
        <strong>
          Please log <code>{account.username}</code> out of the game before continuing.
        </strong>{' '}
        <p>
          <em>You have renamed your account once</em>, so you can only change it back to{' '}
          <code>{account.former_name}</code> now. Press the button below to restore your old account name. Once you do
          this,{' '}
          <strong>
            <Warning>you can never go back to the account name you have now</Warning>
          </strong>
          , so please proceed carefully.
        </p>
        <Button variant='contained' onClick={handleRestore} disabled={restoreButtonDisabled}>
          Restore Username
        </Button>
        {restoreSuccessMessage && (
          <BodyText variant='body' bodyTextAlign='left' color='green'>
            {restoreSuccessMessage}
          </BodyText>
        )}
      </>
    )
  }

  return (
    <>
      <strong>
        Please log <code>{account.username}</code> out of the game before continuing.
      </strong>{' '}
      <Warning>You can only rename an account once</Warning>, so please choose wisely when picking a new account name.
      Any spaces at the beginning or end of your new name will not be counted, but spaces within are fine.
    </>
  )
}

export default RenameAccountModalBody
