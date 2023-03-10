import { useState } from 'react'
import { b64toBlob } from '@/lib/helpers/base64'

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
      blobToBase64(i, (base64: string) => { 
        console.log('base64', base64)
        base64Data = base64
        console.log('result: ', base64Data)

        // Now assuming we enter that into the DB
        // Can we now render it?
        const convertedBlob = b64toBlob(base64Data)
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

  const uploadToServer = async (event: any) => {
    const body = new FormData()
    body.append("file", image)
    // ???
    // const response = await fetch("/api/file", {
    //   method: "POST",
    //   body
    // })
  }

  const blobToBase64 = (blob: any, callback: Function) => {
    const reader = new FileReader()
    reader.onload = function() {
        const dataUrl = reader.result as string;
        const base64 = dataUrl?.split(',')[1];
        callback(base64);
    };
    reader.readAsDataURL(blob);
};

  return (
    <div>
      <div>
        <img src={createObjectURL} alt="" />
        <img src={convertedBlobUrl} alt="converted guy" />
        <h4>Select Image</h4>
        <input type="file" name="myImage" onChange={uploadToClient} />
        <button
          className="btn btn-primary"
          type="submit"
          onClick={uploadToServer}
        >
          Send to server
        </button>
      </div>
    </div>
  )
}

export default UploadPage
