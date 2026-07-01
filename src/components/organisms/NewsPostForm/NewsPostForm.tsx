import ReactMarkdown from 'react-markdown'
import TurndownService from 'turndown'
import { NewsPostFormProps } from './NewsPostForm.types'
import { useEffect, useState } from 'react'
import { convertBlobToBase64String } from '@utils/base64'
import { Modal } from '@molecules/Modal'
import { getNewsPostImageUrl } from '@utils/imageUtils'
import { CloudUpload } from 'lucide-react'
import { Button } from '@ui/button'
import { Input } from '@ui/input'
import { Textarea } from '@ui/textarea'
import clsx from 'clsx'

/** A reusable form for creating or updating a news post. */
const NewsPostForm = (props: NewsPostFormProps) => {
  const { newsPost, onSubmitForm } = props
  const [image, setImage] = useState<string>(newsPost?.image || '')
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string>()
  const [alt, setAlt] = useState<string>(newsPost?.alt || '')
  const [title, setTitle] = useState<string>(newsPost?.title || '')
  const [bodyInput, setBodyInput] = useState<string>(newsPost?.bodyInput || '')
  const [bodyHtml, setBodyHtml] = useState<string>()
  const [previewModalIsOpen, setPreviewModalIsOpen] = useState(false)
  const [submitDisabled, setSubmitDisabled] = useState(false)
  const [submitResult, setSubmitResult] = useState<{ answer: string; code: string }>()
  const submitColorClass: Record<string, string> = {
    green: 'text-primary-main',
    red: 'text-red-600',
  }

  if (previewModalIsOpen) {
    // Prevent scrolling
    document.body.style.overflow = 'hidden'
  }

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const i: File = event.target.files[0]
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
    onSubmitForm({
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
      const htmlWithLinkTargets = mdHTML.replace(/a href/g, "a target='_blank' href")

      // Set the converted body text in state
      setBodyHtml(htmlWithLinkTargets)
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
    <form onSubmit={handleSubmit} className='flex flex-wrap text-left'>
      <div className='flex w-full flex-wrap justify-start gap-2 text-left'>
        <label className='basis-full'>Image</label>
        <span className='basis-full text-sm text-gray-500'>
          Optional. If not provided, a placeholder image will be displayed next to the post.
        </span>
        <div className='flex basis-full gap-2'>
          <Button asChild>
            <label className='flex cursor-pointer items-center gap-2'>
              <CloudUpload />
              Upload file
              <input type='file' onChange={handleImageChange} className='hidden' />
            </label>
          </Button>
          {imagePreviewUrl && (
            <Button variant='outline' onClick={handleClearButtonClick}>
              Clear
            </Button>
          )}
        </div>
        {imagePreviewUrl && <img src={imagePreviewUrl} alt='' className='max-w-50' />}
      </div>
      <Input id='imageAlt' placeholder='Alt Text' onChange={handleAltChange} value={alt} className='mt-2.5 w-full' />
      <Input
        id='postTitle'
        placeholder='Title'
        onChange={handleTitleChange}
        value={title}
        required
        className='mt-2.5 w-full'
      />
      <Textarea
        id='postBody'
        placeholder='Body (supports markdown)'
        onChange={handleBodyChange}
        value={bodyInput}
        required
        className='mt-2.5 w-full break-all lg:break-normal'
      />
      <div className='hidden'>
        <ReactMarkdown className='news-post-body-markdown-html'>{bodyInput}</ReactMarkdown>
      </div>
      <div className='mt-5 flex w-full justify-start'>
        <Button variant='outline' type='button' onClick={handlePreviewClick} disabled={!(bodyInput || bodyHtml)}>
          Preview
        </Button>
      </div>
      <Modal
        open={previewModalIsOpen}
        handleClose={handlePreviewModalClose}
        heading='Preview'
        body={
          <>
            <h2 className='text-3xl'>{title}</h2>
            {bodyHtml && (
              <div
                dangerouslySetInnerHTML={{ __html: bodyHtml }}
                className='news-post-detail-body text-base break-all lg:break-normal'
              />
            )}
          </>
        }
        bodyScrollable
      />
      <div className='flex w-full flex-wrap items-center justify-center'>
        <Button variant='default' type='submit' disabled={submitDisabled} className='mt-10 basis-full'>
          Submit
        </Button>
      </div>
      {submitResult?.answer && (
        <label className={clsx('mt-2.5 basis-full text-sm', submitColorClass[submitResult.code] ?? 'text-black')}>
          {submitResult.answer}
        </label>
      )}
    </form>
  )
}

export default NewsPostForm
