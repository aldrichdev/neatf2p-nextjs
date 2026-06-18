import { BodyText } from '@atoms/BodyText'
import { Form } from '@atoms/Form'
import { FieldValidationMessage } from '@atoms/FieldValidationMessage'
import { ModalProps } from './Modal.types'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@ui/dialog'
import { Button } from '@ui/button'

const Modal = (props: ModalProps) => {
  const {
    open,
    handleClose,
    heading,
    body,
    hasForm,
    handleSubmit,
    renderFields,
    formValidationError,
    formSuccessMessage,
    bodyScrollable,
  } = props

  return (
    <Dialog open={open} onOpenChange={isOpen => !isOpen && handleClose()}>
      <DialogContent aria-describedby={undefined} className='lg:max-w-150'>
        <DialogHeader>
          <DialogTitle className='text-[32px]'>{heading}</DialogTitle>
        </DialogHeader>
        {bodyScrollable ? (
          <div className='relative h-100'>
            <BodyText bodyTextAlign='left' mobileTextAlign='left' className='h-full overflow-y-scroll'>
              {body}
            </BodyText>
          </div>
        ) : (
          <BodyText bodyTextAlign='left'>{body}</BodyText>
        )}
        {hasForm && handleSubmit && renderFields && (
          <>
            <Form onSubmit={handleSubmit} desktopFullWidth>
              {renderFields()}
              {formValidationError && <FieldValidationMessage>{formValidationError}</FieldValidationMessage>}
              <div className='flex w-full justify-between gap-5 md:w-auto md:justify-start'>
                <Button type='submit'>Submit</Button>
                <Button variant='outline' type='button' onClick={handleClose}>
                  Cancel
                </Button>
              </div>
            </Form>
            {formSuccessMessage && (
              <BodyText bodyTextAlign='left' className='text-primary-main'>
                {formSuccessMessage}
              </BodyText>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default Modal
