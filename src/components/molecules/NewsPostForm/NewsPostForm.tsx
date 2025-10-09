import { Field } from '@atoms/Field'
import { Button } from '@mui/material'
import { NewsPostTitle } from '@organisms/NewsPostListItem/NewsPostListItem.styled'
import ReactMarkdown from 'react-markdown'
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
import { handleForbiddenRedirect, sendApiRequest } from '@helpers/api/apiUtils'
import { AxiosError } from 'axios'
import { Modal } from '@molecules/Modal'

/** A reusable form for creating or updating a news post. */
const NewsPostForm = (props: NewsPostFormProps) => {
  const { newsPostId, imageId, userId } = props
  const [image, setImage] = useState<string>('')
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string>()
  const [alt, setAlt] = useState<string>('')
  const [title, setTitle] = useState<string>('')
  const [bodyInput, setBodyInput] = useState<string>('')
  const [bodyHtml, setBodyHtml] = useState<string>('')
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
    }
  }

  const handleAltChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAlt(event.target.value)
  }

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value)
  }

  const handleBodyChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBodyInput(event.target.value)
  }

  const handleClearButtonClick = () => {
    setImage('')
    setImagePreviewUrl('')
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

    if (newsPostId) {
      updateNewsPost()
    } else {
      createNewsPost()
    }
  }

  // TODO: Should these be callback functions that are provided to this component?
  const createNewsPost = () => {
    sendApiRequest('POST', '/api/createNewsPost', {
      userId,
      image,
      alt,
      title,
      datePosted: new Date(),
      body: bodyHtml,
      bodyInput,
    })
      .then(response => {
        setSubmitResult({
          answer: response?.data,
          code: response?.data?.includes('Success') ? 'green' : 'red',
        })
      })
      .catch((error: AxiosError<string>) => {
        setSubmitResult({
          answer: error?.response?.data || '',
          code: 'red',
        })
        handleForbiddenRedirect(error)
      })
  }

  const updateNewsPost = () => {
    if (newsPostId === null) {
      return
    }

    sendApiRequest('POST', '/api/updateNewsPost', {
      userId,
      newsPostId,
      imageId,
      image,
      alt,
      title,
      body: bodyHtml,
      bodyInput,
    })
      .then(response => {
        setSubmitResult({
          answer: response?.data,
          code: response?.data?.includes('Success') ? 'green' : 'red',
        })
      })
      .catch((error: AxiosError<string>) => {
        setSubmitResult({
          answer: error?.response?.data || '',
          code: 'red',
        })
        handleForbiddenRedirect(error)
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
      <Field id='imageAlt' label='Alt Text' variant='outlined' onChange={handleAltChange} />
      <Field id='postTitle' label='Title' variant='outlined' onChange={handleTitleChange} required />
      <Field
        id='postBody'
        label='Body'
        variant='outlined'
        helperText='Supports markdown'
        onChange={handleBodyChange}
        multiline
        required
      />
      <ForHtmlOutput>
        <ReactMarkdown className='news-post-body-markdown-html'>{bodyInput}</ReactMarkdown>
      </ForHtmlOutput>
      <PreviewButtonContainer>
        <Button variant='outlined' onClick={handlePreviewClick} disabled={!bodyInput}>
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
