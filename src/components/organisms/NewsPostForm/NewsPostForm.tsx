import { Field } from '@atoms/Field'
import { Button } from '@mui/material'
import { NewsPostTitle } from '@organisms/NewsPostListItem/NewsPostListItem.styled'
import ReactMarkdown from 'react-markdown'
import TurndownService from 'turndown'
import {
  ClearButton,
  FileUploadButton,
  ForHtmlOutput,
  ImageArea,
  ImageButtonContainer,
  ImageHelperText,
  ImageLabel,
  PreviewButtonContainer,
  PreviewImage,
  StyledForm,
  SubmitArea,
  SubmitButton,
  SubmitMessage,
  VisuallyHiddenInput,
} from './NewsPostForm.styled'
import { NewsPostFormProps } from './NewsPostForm.types'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { useEffect, useState } from 'react'
import { convertBlobToBase64String } from '@helpers/base64'
import { Modal } from '@molecules/Modal'
import { getNewsPostImageUrl } from '@helpers/imageUtils'

/** A reusable form for creating or updating a news post. */
const NewsPostForm = (props: NewsPostFormProps) => {
  const { newsPost, submitForm } = props
  const [image, setImage] = useState<string>(newsPost?.image || '')
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string>()
  const [alt, setAlt] = useState<string>(newsPost?.alt || '')
  const [title, setTitle] = useState<string>(newsPost?.title || '')
  const [bodyInput, setBodyInput] = useState<string>(newsPost?.bodyInput || '')
  const [bodyHtml, setBodyHtml] = useState<string>()
  const [previewModalIsOpen, setPreviewModalIsOpen] = useState(false)
  const [submitDisabled, setSubmitDisabled] = useState(false)
  const [submitResult, setSubmitResult] = useState<{ answer: string; code: string }>()

  if (previewModalIsOpen) {
    // Prevent scrolling
    document.body.style.overflow = 'hidden'
  }

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0]
      setImagePreviewUrl(URL.createObjectURL(i))

      convertBlobToBase64String(i, (base64: string) => {
        setImage(base64)
      })

      setSubmitDisabled(false)
    }
  }

  const handleAltChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAlt(event.target.value)
    setSubmitDisabled(false)
  }

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value)
    setSubmitDisabled(false)
  }

  const handleBodyChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBodyInput(event.target.value)
    setSubmitDisabled(false)
  }

  const handleClearButtonClick = () => {
    setImage('')
    setImagePreviewUrl('')
    setSubmitDisabled(false)
  }

  const handlePreviewClick = () => {
    setPreviewModalIsOpen(true)
  }

  const handlePreviewModalClose = () => {
    setPreviewModalIsOpen(false)
    document.body.style.overflow = 'unset'
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitDisabled(true)

    // Submit the form using the callback provided (will create or update a news post)
    submitForm({
      image,
      alt,
      title,
      bodyHtml: bodyHtml || '',
      bodyInput,
      setSubmitResult,
    })
  }

  useEffect(() => {
    const el = document.querySelector('.news-post-body-markdown-html')
    if (el) {
      const mdHTML = el.innerHTML
      // Set the converted body text in state
      setBodyHtml(mdHTML)
    }
  }, [bodyInput])

  useEffect(() => {
    if (newsPost?.image) {
      setImagePreviewUrl(getNewsPostImageUrl(newsPost.image))
    }
  }, [newsPost?.image])

  useEffect(() => {
    const turndownService = new TurndownService()
    setBodyHtml(newsPost?.body || '')
    setBodyInput(turndownService.turndown(newsPost?.body || ''))
  }, [newsPost?.body])

  return (
    <StyledForm onSubmit={handleSubmit}>
      <ImageArea>
        <ImageLabel>Image</ImageLabel>
        <ImageHelperText>
          Optional. If not provided, a placeholder image will be displayed next to the post.
        </ImageHelperText>
        <ImageButtonContainer>
          <FileUploadButton component='label' variant='contained' startIcon={<CloudUploadIcon />}>
            Upload file
            <VisuallyHiddenInput type='file' onChange={handleImageChange} />
          </FileUploadButton>
          {imagePreviewUrl && (
            <ClearButton variant='outlined' onClick={handleClearButtonClick}>
              Clear
            </ClearButton>
          )}
        </ImageButtonContainer>
        <PreviewImage src={imagePreviewUrl} alt='' />
      </ImageArea>
      <Field id='imageAlt' label='Alt Text' variant='outlined' onChange={handleAltChange} value={alt} />
      <Field id='postTitle' label='Title' variant='outlined' onChange={handleTitleChange} value={title} required />
      <Field
        id='postBody'
        label='Body'
        variant='outlined'
        helperText='Supports markdown'
        onChange={handleBodyChange}
        multiline
        value={bodyInput}
        required
      />
      <ForHtmlOutput>
        <ReactMarkdown className='news-post-body-markdown-html'>{bodyInput}</ReactMarkdown>
      </ForHtmlOutput>
      <PreviewButtonContainer>
        <Button variant='outlined' onClick={handlePreviewClick} disabled={!(bodyInput || bodyHtml)}>
          Preview
        </Button>
      </PreviewButtonContainer>
      <Modal
        open={previewModalIsOpen}
        handleClose={handlePreviewModalClose}
        heading='Preview'
        body={
          <>
            <NewsPostTitle variant='body'>{title}</NewsPostTitle>
            <ReactMarkdown className='news-post-body-markdown'>{bodyInput}</ReactMarkdown>
          </>
        }
        bodyScrollable
      />
      <SubmitArea>
        <SubmitButton variant='contained' type='submit' disabled={submitDisabled}>
          Submit
        </SubmitButton>
      </SubmitArea>
      <SubmitMessage color={submitResult?.code}>{submitResult?.answer}</SubmitMessage>
    </StyledForm>
  )
}

export default NewsPostForm
