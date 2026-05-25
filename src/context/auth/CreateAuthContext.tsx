import { createContext } from "react"
import type { AuthContexttype } from "../../typescript/interface/auth.interface"

const AuthContext = createContext<AuthContexttype| null>(null)


export default AuthContext;