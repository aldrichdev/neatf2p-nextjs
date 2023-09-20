import { useState } from 'react'
import axios from 'axios';
import { convertBlobToBase64String } from '@helpers/base64'
import { StyledForm, Field, SubmitArea, SubmitButton, SubmitMessage } from '@styled/NewsPostForm/NewsPostForm.styled'
import Typography from '@mui/material/Typography'

// TODO: F2P-1 - Check if user is logged in
const NewsPostForm = () => {
  const [image, setImage] = useState<string>('')
  const [alt, setAlt] = useState<string>('')
  const [title, setTitle] = useState<string>('')
  const [body, setBody] = useState<string>('')
  const [submitResult, setSubmitResult] = useState<{ answer: string; code: string; }>()

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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    sendDataToApi(image, alt, title, body)
  }

  const sendDataToApi = (imageBase64: string, alt: string, title: string, body: string) => {
    axios.post('/api/submitNewsPost', {
      image: imageBase64,
      alt,
      title,
      datePosted: new Date(),
      body
    })
    .then((response) => {
      setSubmitResult({
        answer: response?.data,
        code: response?.data?.includes('SUCCESS') ? 'green' : 'red',
      })
    })
    .catch((error: { response: { data: string; } }) => {
      setSubmitResult({
        answer: error.response.data,
        code: 'red',
      })
    })
  }

  return (
    <>
      <Typography variant="h2">Submit a News Post</Typography>
      <StyledForm onSubmit={handleSubmit}>
        <Field>
          <label htmlFor="imageSrc">Image</label>
          <input type="file" id="imageSrc" onChange={handleImageChange} />
        </Field>
        <Field>
          <label htmlFor="imageAlt">Alt Text</label>
          <input type="string" id="imageAlt" onChange={handleAltChange} />
        </Field>
        <Field>
          <label htmlFor="postTitle">Title</label>
          <input type="string" id="postTitle" onChange={handleTitleChange} required />
        </Field>
        <Field>
          <label htmlFor="postBody">Body</label>
          <textarea id="postBody" rows={10} cols={70} onChange={handleBodyChange} required />
        </Field>
        <SubmitArea>
          <SubmitButton type="submit">Submit</SubmitButton>
          <SubmitMessage color={submitResult?.code}>{submitResult?.answer}</SubmitMessage>
        </SubmitArea>

      </StyledForm>
    </>
  )
}

export default NewsPostForm