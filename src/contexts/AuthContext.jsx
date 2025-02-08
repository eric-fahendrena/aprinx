import { createContext } from "react"
import { fetchUserToken } from "../services/api.js"

export const AuthContext = createContext()
export const AuthProvider = ({ children }) => {
  const getToken = async () => {
    const token = await fetchUserToken()
    localStorage.setItem("token", token.jwt_token)
    return token.jwt_token
  }
  getToken()

  return (
    <AuthContext.Provider value={{ getToken }}>
      {children}
    </AuthContext.Provider>
  )
}
