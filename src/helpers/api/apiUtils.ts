import { redirectTo } from '@helpers/window'
import axios, { AxiosError } from 'axios'
import { NextApiResponse } from 'next'

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

  if (headers) {
    return axios.post(endpointUrl, body, {
      headers,
    })
  }

  return axios.post(endpointUrl, body)
}

/** Checks if the `sessionCookie` value provided matches a `session` column value in the database
 * for the `userId` provided. If not, the API call is blocked (`true` is returned). */
export const shouldBlockApiCall = async (userId: string, sessionCookie: string | undefined) => {
  let returnValue = false

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
      }
    })
    .catch((error: string) => {
      console.log('An error occurred in shouldBlockApiCall calling checkWebsiteUserSession: ', error)
      returnValue = true
    })

  return returnValue
}

export const sendBadRequest = (res: NextApiResponse, errorMessage: string) => {
  res.statusCode = 400
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(errorMessage))
  return
}

export const handleForbiddenRedirect = (error: AxiosError<string>) => {
  // If the error is an HTTP 403, it means the user's session cookie value
  // no longer matches the one that was saved when they last logged in.
  // Log the user out and redirect to the Session Expired page.
  if (error?.response?.status === 403 || error?.response?.data?.toLowerCase().includes('forbidden')) {
    sendApiRequest('GET', '/api/ironLogout')
      .then(() => {
        redirectTo('/account/session-expired')
      })
      .catch((error: string) => {
        console.log('An error occurred on logout (expired session): ', error)
      })
  }
}
