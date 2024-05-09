import { useEffect, useState } from 'react'
import { convertBlobToBase64String } from '@helpers/base64'
import {
  StyledForm,
  SubmitArea,
  SubmitButton,
  SubmitMessage,
  VisuallyHiddenInput,
  PreviewImage,
  FileUploadButton,
  ImageArea,
  ImageLabel,
  ImageHelperText,
  ImageButtonContainer,
  ClearButton,
  PreviewButtonContainer,
  ForHtmlOutput,
} from '@styledPages/NewsPostForm.styled'
import useAuthentication from '@hooks/useAuthentication'
import { Spinner } from '@molecules/Spinner'
import { MustBeAdminBlock } from '@molecules/MustBeAdminBlock'
import { PageHeading } from '@atoms/PageHeading'
import ReactMarkdown from 'react-markdown'
import { Modal } from '@molecules/Modal'
import { Button } from '@mui/material'
import { NewsPostTitle } from '@organisms/NewsPostListItem/NewsPostListItem.styled'
import { Field } from '@atoms/Field'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { ContentBlock } from '@atoms/ContentBlock'
import { handleForbiddenRedirect, sendApiRequest } from '@helpers/api/apiUtils'
import { renderHead } from '@helpers/renderUtils'

const NewsPostForm = () => {
  const [loading, setLoading] = useState(true)
  const [image, setImage] = useState<string>('')
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string>()
  const [alt, setAlt] = useState<string>('')
  const [title, setTitle] = useState<string>('')
  const [body, setBody] = useState<string>('')
  const [bodyHtml, setBodyHtml] = useState<string>('')
  const [previewModalIsOpen, setPreviewModalIsOpen] = useState(false)
  const [submitDisabled, setSubmitDisabled] = useState(false)
  const [submitResult, setSubmitResult] = useState<{ answer: string; code: string }>()
  const user = useAuthentication(setLoading)

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
    setBody(event.target.value)
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
    sendDataToApi(image, alt, title, bodyHtml)
  }

  const sendDataToApi = (imageBase64: string, alt: string, title: string, body: string) => {
    sendApiRequest('POST', '/api/submitNewsPost', {
      userId: user.id,
      image: imageBase64,
      alt,
      title,
      datePosted: new Date(),
      body,
    })
      .then(response => {
        setSubmitResult({
          answer: response?.data,
          code: response?.data?.includes('Success') ? 'green' : 'red',
        })
      })
      .catch((error: { response: { data: string } }) => {
        setSubmitResult({
          answer: error.response.data,
          code: 'red',
        })
        handleForbiddenRedirect(error.response.data)
      })
  }

  useEffect(() => {
    const el = document.querySelector('.news-post-body-markdown-html')
    if (el) {
      const mdHTML = el.innerHTML
      setBodyHtml(mdHTML)
    }
  }, [body])

  if (loading) {
    return (
      <>
        {renderHead('Submit News Post')}
        <Spinner />
      </>
    )
  }

  if (!user?.isAdmin) {
    return <MustBeAdminBlock />
  }

  return (
    <>
      {renderHead('Submit News Post')}
      <PageHeading>Submit a News Post</PageHeading>
      <ContentBlock topMargin={40}>
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
            <ReactMarkdown className='news-post-body-markdown-html'>{body}</ReactMarkdown>
          </ForHtmlOutput>
          <PreviewButtonContainer>
            <Button variant='outlined' onClick={handlePreviewClick} disabled={!body}>
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
                <ReactMarkdown className='news-post-body-markdown'>{body}</ReactMarkdown>
              </>
            }
          />
          <SubmitArea>
            <SubmitButton variant='contained' type='submit' disabled={submitDisabled}>
              Submit
            </SubmitButton>
          </SubmitArea>
          <SubmitMessage color={submitResult?.code}>{submitResult?.answer}</SubmitMessage>
        </StyledForm>
      </ContentBlock>
    </>
  )
}

export default NewsPostForm
