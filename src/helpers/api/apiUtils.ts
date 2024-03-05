import axios from 'axios'

/** This type comprises all the possible types of values in body properties. */
type BodyValueType = string | number | string[] | undefined | boolean | Date

/** Used for sending internal (i.e. `/api/xyz`) API requests. Do NOT use this for external / 3rdparty APIs. */
export const sendApiRequest = (method: 'GET' | 'POST', endpointUrl: string, body?: Record<string, BodyValueType>) => {
  if (method === 'GET') {
    return axios.get(endpointUrl)
  }

  return axios.post(endpointUrl, body)
}
