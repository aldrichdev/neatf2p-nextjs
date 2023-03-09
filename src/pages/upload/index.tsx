import { useState } from 'react'

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

  const b64toBlob = (b64Data: string, contentType='', sliceSize=512) => {
    const byteCharacters = atob(b64Data)
    const byteArrays = []
  
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize)
  
      const byteNumbers = new Array(slice.length)
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i)
      }
  
      const byteArray = new Uint8Array(byteNumbers)
      byteArrays.push(byteArray)
    }
  
    const blob = new Blob(byteArrays, {type: contentType})
    return blob
  }

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
