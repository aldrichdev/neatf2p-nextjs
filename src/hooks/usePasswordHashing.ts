import bcrypt from 'bcryptjs'

const usePasswordHashing = () => {
  /** Whether a password entered by the user matches the password associated
   * with their account in the database.
   */
  const passwordValid = (
    result: Record<string, string | number>,
    passwordEntered: string,
    exceptionHandler: (e: Error) => void,
  ) => {
    const hashedPassword = result?.password
    const passwordSalt = result?.passwordSalt
    let currentPasswordHashed = ''

    try {
      currentPasswordHashed = bcrypt.hashSync(passwordEntered, passwordSalt)
    } catch (error) {
      if (error instanceof Error) {
        exceptionHandler(error)
      }

      return false
    }

    if (hashedPassword !== currentPasswordHashed) {
      return false
    }

    return true
  }

  return {
    passwordValid,
  }
}

export default usePasswordHashing
