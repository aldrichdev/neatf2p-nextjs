/** A user is a website account. */
export type User = {
  id: number;
  username: string;
  emailAddress: string;
  lastLogin: Date;
  isAdmin: boolean;
}

export type UserContextType = {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}