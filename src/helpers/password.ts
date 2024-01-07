import bcrypt from 'bcryptjs'

/** Hashes a plain text password using the default bcrypt hashing algorithm.
 * `isGamePassword` - pass a true value if you are manipulating the player table.
 *   It requires a different hashing syntax and does not store a salt.
 */
export const hashPassword = (password: string, isGamePassword?: boolean) => {
  const passwordSalt = bcrypt.genSaltSync()
  const hashedPassword = bcrypt.hashSync(password, passwordSalt)

  if (isGamePassword) {
    // Note: Core Framework code requires hashed passwords to begin with `$2y` or it is not considered valid.
    return { hashedPassword: hashedPassword.replace('$2a', '$2y') }
  }

  return !isGamePassword ? { hashedPassword, passwordSalt } : { hashedPassword }
}
