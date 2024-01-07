export const convertBlobToBase64String = (blob: any, callback: (base64: string) => void) => {
  const reader = new FileReader()
  reader.onload = function () {
    const dataUrl = reader.result as string
    const base64 = dataUrl?.split(',')[1]
    callback(base64)
  }
  reader.readAsDataURL(blob)
}

export const convertBase64StringToBlob = (b64Data: string, contentType = '', sliceSize = 512) => {
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

  const blob = new Blob(byteArrays, { type: contentType })
  return blob
}

export const getImageUrlFromBase64 = (base64String: string) => {
  const convertedBlob = convertBase64StringToBlob(base64String)
  const convertedUrl = URL.createObjectURL(convertedBlob)

  return convertedUrl
}
