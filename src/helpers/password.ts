import bcrypt from 'bcryptjs'

/** Hashes a plain text password using the default bcrypt hashing algorithm.
 * `isCoreFramework` - pass a true value if you are manipulating the player table.
 *   It requires a different hashing syntax.
 * `returnSalt` - if you would like the password salt generated returned with the hashed password.
 */
export const hashPassword = (password: string, isCoreFramework?: boolean, returnSalt?: boolean) => {
  const passwordSalt = bcrypt.genSaltSync()
  const hashedPassword = bcrypt.hashSync(password, passwordSalt)

  if (isCoreFramework) {
    // Note: Core Framework code requires hashed passwords to begin with `$2y` or it is not considered valid.
    return { hashedPassword: hashedPassword.replace('$2a', '$2y') }
  }

  return returnSalt ? { hashedPassword, passwordSalt } : { hashedPassword }
}
