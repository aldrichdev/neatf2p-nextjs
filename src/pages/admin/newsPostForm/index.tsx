import { useEffect, useState } from 'react'
import axios from 'axios'
import { convertBlobToBase64String } from '@helpers/base64'
import {
  StyledForm,
  Field,
  SubmitArea,
  SubmitButton,
  SubmitMessage,
  FieldInfo,
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

const NewsPostForm = () => {
  const [loading, setLoading] = useState(true)
  const [image, setImage] = useState<string>('')
  const [alt, setAlt] = useState<string>('')
  const [title, setTitle] = useState<string>('')
  const [body, setBody] = useState<string>('')
  const [bodyHtml, setBodyHtml] = useState<string>('')
  const [previewModalIsOpen, setPreviewModalIsOpen] = useState(false)
  const [submitResult, setSubmitResult] = useState<{ answer: string; code: string }>()
  const user = useAuthentication(setLoading)

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0]
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

  // Is there not an easier way to do this without every field needing its own function to set state?
  const handleBodyChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBody(event.target.value)
  }

  const handlePreviewClick = () => {
    setPreviewModalIsOpen(true)
  }

  const handlePreviewModalClose = () => {
    setPreviewModalIsOpen(false)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    sendDataToApi(image, alt, title, bodyHtml)
  }

  const sendDataToApi = (imageBase64: string, alt: string, title: string, body: string) => {
    axios
      .post('/api/submitNewsPost', {
        image: imageBase64,
        alt,
        title,
        datePosted: new Date(),
        body,
      })
      .then(response => {
        setSubmitResult({
          answer: response?.data,
          code: response?.data?.includes('SUCCESS') ? 'green' : 'red',
        })
      })
      .catch((error: { response: { data: string } }) => {
        setSubmitResult({
          answer: error.response.data,
          code: 'red',
        })
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
    return <Spinner />
  }

  if (!user?.isAdmin) {
    return <MustBeAdminBlock />
  }

  return (
    <>
      <PageHeading>Submit a News Post</PageHeading>
      <StyledForm onSubmit={handleSubmit}>
        <Field>
          <label htmlFor='imageSrc'>Image</label>
          <FieldInfo>(Optional; if not provided, a placeholder image will be displayed next to the post)</FieldInfo>
          <input type='file' id='imageSrc' onChange={handleImageChange} />
        </Field>
        <Field>
          <label htmlFor='imageAlt'>Alt Text</label>
          <input type='string' id='imageAlt' onChange={handleAltChange} />
        </Field>
        <Field>
          <label htmlFor='postTitle'>Title</label>
          <input type='string' id='postTitle' onChange={handleTitleChange} required />
        </Field>
        <Field>
          <label htmlFor='postBody'>Body</label>
          <FieldInfo>(Supports markdown)</FieldInfo>
          <textarea id='postBody' rows={10} cols={70} onChange={handleBodyChange} required />
          <ForHtmlOutput>
            <ReactMarkdown className='news-post-body-markdown-html'>{body}</ReactMarkdown>
          </ForHtmlOutput>
        </Field>
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
          <SubmitButton type='submit'>Submit</SubmitButton>
          <SubmitMessage color={submitResult?.code}>{submitResult?.answer}</SubmitMessage>
        </SubmitArea>
      </StyledForm>
    </>
  )
}

export default NewsPostForm
