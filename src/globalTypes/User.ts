/** A user is a website account. */
export type User = {
  id: number;
  username: string;
  emailAddress: string;
  lastLogin: Date;
  isAdmin: boolean;
}
