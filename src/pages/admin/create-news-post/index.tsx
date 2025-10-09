import { MustBeAdminBlock } from '@molecules/MustBeAdminBlock'
import { PageHeading } from '@atoms/PageHeading'
import { ContentBlock } from '@atoms/ContentBlock'
import { renderHead } from '@helpers/renderUtils'
import { User } from '@globalTypes/User'
import { NullUser } from '@models/NullUser'
import { sessionOptions } from '@models/session'
import { getIronSession } from 'iron-session'
import { GetServerSideProps } from 'next'
import { NewsPostForm } from '@molecules/NewsPostForm'

type CreateNewsPostPageProps = {
  user: User
}

const CreateNewsPostPage = ({ user }: CreateNewsPostPageProps) => {
  // const [image, setImage] = useState<string>('')
  // const [imagePreviewUrl, setImagePreviewUrl] = useState<string>()
  // const [alt, setAlt] = useState<string>('')
  // const [title, setTitle] = useState<string>('')
  // const [body, setBody] = useState<string>('')
  // const [bodyHtml, setBodyHtml] = useState<string>('')
  // const [previewModalIsOpen, setPreviewModalIsOpen] = useState(false)
  // const [submitDisabled, setSubmitDisabled] = useState(false)
  // const [submitResult, setSubmitResult] = useState<{ answer: string; code: string }>()

  // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault()
  //   setSubmitDisabled(true)
  //   sendDataToApi(image, alt, title, bodyHtml, body)
  // }

  // const sendDataToApi = (imageBase64: string, alt: string, title: string, body: string, bodyInput: string) => {
  //   sendApiRequest('POST', '/api/createNewsPost', {
  //     userId: user.id,
  //     image: imageBase64,
  //     alt,
  //     title,
  //     datePosted: new Date(),
  //     body,
  //     bodyInput,
  //   })
  //     .then(response => {
  //       setSubmitResult({
  //         answer: response?.data,
  //         code: response?.data?.includes('Success') ? 'green' : 'red',
  //       })
  //     })
  //     .catch((error: AxiosError<string>) => {
  //       setSubmitResult({
  //         answer: error?.response?.data || '',
  //         code: 'red',
  //       })
  //       handleForbiddenRedirect(error)
  //     })
  // }

  // useEffect(() => {
  //   const el = document.querySelector('.news-post-body-markdown-html')
  //   if (el) {
  //     const mdHTML = el.innerHTML
  //     setBodyHtml(mdHTML)
  //   }
  // }, [body])

  return (
    <>
      {renderHead('Create News Post')}
      {!user?.isAdmin ? (
        <MustBeAdminBlock />
      ) : (
        <ContentBlock>
          <PageHeading>Create a News Post</PageHeading>
          <NewsPostForm userId={user.id} />
          {/* <StyledForm onSubmit={handleSubmit}>
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
              bodyScrollable
            />
            <SubmitArea>
              <SubmitButton variant='contained' type='submit' disabled={submitDisabled}>
                Submit
              </SubmitButton>
            </SubmitArea>
            <SubmitMessage color={submitResult?.code}>{submitResult?.answer}</SubmitMessage>
          </StyledForm> */}
        </ContentBlock>
      )}
    </>
  )
}

export default CreateNewsPostPage

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getIronSession(req, res, sessionOptions)
  const user: User = session?.user || NullUser

  return {
    props: {
      user: JSON.parse(JSON.stringify(user)),
    },
  }
}
