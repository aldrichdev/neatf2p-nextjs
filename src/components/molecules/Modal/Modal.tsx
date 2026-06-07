import { BodyText } from '@atoms/BodyText'
import { Form } from '@atoms/Form'
import { FormButton } from '@atoms/FormButton/FormButton'
import { FieldValidationMessage } from '@atoms/FieldValidationMessage'
import { ModalProps } from './Modal.types'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@ui/dialog'

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
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle className='md:text-[32px]'>{heading}</DialogTitle>
        </DialogHeader>
        {bodyScrollable ? (
          <div className='relative h-100'>
            <BodyText bodyTextAlign='left' mobileTextAlign='left' topMargin={0} className='h-full overflow-y-scroll'>
              {body}
            </BodyText>
          </div>
        ) : (
          <BodyText bodyTextAlign='left' topMargin={0}>
            {body}
          </BodyText>
        )}
        {hasForm && handleSubmit && renderFields && (
          <>
            <Form onSubmit={handleSubmit}>
              {renderFields()}
              {formValidationError && <FieldValidationMessage>{formValidationError}</FieldValidationMessage>}
              <div className='flex w-full justify-between gap-5 md:w-auto md:justify-start'>
                <FormButton variant='contained' type='submit'>
                  Submit
                </FormButton>
                <FormButton variant='outlined' type='button' onClick={handleClose}>
                  Cancel
                </FormButton>
              </div>
            </Form>
            {formSuccessMessage && (
              <BodyText bodyTextAlign='left' topMargin={0} className='text-green-600'>
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
