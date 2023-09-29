import { getDateString } from './date'

describe('Date', () => {
  test('getDateString formats dates correctly', () => {
    let date = new Date(2022, 11, 10)
    let value = getDateString(date)
    expect(value).toEqual('December 10th, 2022')

    date = new Date(2022, 11, 1)
    value = getDateString(date)
    expect(value).toEqual('December 1st, 2022')

    date = new Date(2022, 11, 2)
    value = getDateString(date)
    expect(value).toEqual('December 2nd, 2022')

    date = new Date(2022, 11, 3)
    value = getDateString(date)
    expect(value).toEqual('December 3rd, 2022')
  })
})
