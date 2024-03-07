import axios from 'axios'

/** This type comprises all the possible types of values in body properties. */
type BodyValueType = string | number | string[] | undefined | boolean | Date

/** Used for sending internal (i.e. `/api/xyz`) API requests. Do NOT use this for external / 3rdparty APIs. */
export const sendApiRequest = (
  method: 'GET' | 'POST',
  endpointUrl: string,
  body?: Record<string, BodyValueType>,
  headers?: Record<string, string>,
) => {
  if (method === 'GET') {
    if (headers) {
      return axios.get(endpointUrl, {
        headers,
      })
    }

    return axios.get(endpointUrl)
  }

  // TODO: If this fixes logout, try `headers ? { ... headers ... } : undefined` inline instead
  if (headers) {
    return axios.post(endpointUrl, body, {
      headers,
    })
  }

  return axios.post(endpointUrl, body)
}

export const shouldBlockApiCall = async (userId: string, sessionCookie: string | undefined) => {
  let returnValue

  await axios
    .get(`${process.env.APP_URL}/api/checkWebsiteUserSession?userId=${userId}`, {
      headers: {
        'neat-f2p-session-cookie': sessionCookie,
      },
    })
    .then(response => {
      const count = response.data?.[0]?.['COUNT(id)']

      if (typeof count !== 'number' || Number(count) < 1) {
        // No user found for current session - block API call.
        console.log('BLOCKING api call')
        returnValue = true
      } else {
        // Allow API call, and proceed as usual.
        console.log('Allowing api call')
        returnValue = false
      }
    })

  return returnValue
}
