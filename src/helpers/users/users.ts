import { User } from '@globalTypes/User'

export const UserIsLoggedIn = (user: User) => user?.id !== 'NULL'

export const UserExists = (user: User) => user?.id !== null && user?.id !== 'NULL' && user?.id?.length > 0

/** Whether or not a user's password reset token has expired.
 * `userDateModifiedMillis`: the user's dateModified value converted to milliseconds.
 */
export const ResetTokenHasExpired = (userDateModifiedMillis: number) =>
  (new Date().getTime() - userDateModifiedMillis) / 60000 > 10
