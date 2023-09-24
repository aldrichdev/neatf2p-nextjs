import { createContext } from "react";
import { UserContextType } from "./UserContext.types";
import { NullUser } from "@models/NullUser";

const UserContext = createContext<UserContextType>({
  user: NullUser,
  setUser: () => {},
})

export default UserContext;