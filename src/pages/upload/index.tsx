import { useState } from 'react'
import { convertBlobToBase64String, convertBase64StringToBlob } from '@/lib/helpers/base64'

// This is just a test page to see how uploading images from Next.js could work. [F2P-4]
// Mostly taken from https://codesandbox.io/s/thyb0?file=/pages/index.js:738-1088 and various SO posts
const UploadPage = () => {
  const [image, setImage] = useState<string | Blob>('')
  const [createObjectURL, setCreateObjectURL] = useState('')
  const [convertedBlobUrl, setConvertedBlobUrl] = useState('')

  const uploadToClient = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0]
      console.log('i (aka the image)', i)
      console.log(new Blob([i], { type: 'image/png'}))

      let base64Data = ''
      convertBlobToBase64String(i, (base64: string) => { 
        console.log('base64', base64)
        base64Data = base64
        console.log('result: ', base64Data)

        // Now assuming we enter that into the DB
        // Can we now render it?
        const convertedBlob = convertBase64StringToBlob(base64Data)
        console.log('convertedBlob', convertedBlob)
        const convertedUrl = URL.createObjectURL(convertedBlob)
        console.log('convertedUrl', convertedUrl)

        setConvertedBlobUrl(convertedUrl)
      })


      setImage(i)
      
      console.log('URL.createObjectURL(i)', URL.createObjectURL(i))
      setCreateObjectURL(URL.createObjectURL(i))
    }
  }

  return (
    <div>
      <div>
        <img src={createObjectURL} alt="" />
        <img src={convertedBlobUrl} alt="converted guy" />
        <h4>Select Image</h4>
        <input type="file" name="myImage" onChange={uploadToClient} />
      </div>
    </div>
  )
}

export default UploadPage
