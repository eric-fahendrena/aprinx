import { createContext, useEffect } from "react"
import { fetchUserToken } from "../services/api.js"

export const AuthContext = createContext()
export const AuthProvider = ({ children }) => {
  const registerToken = async () => {
    const token = await fetchUserToken()
    localStorage.setItem("token", token.jwt_token)
    sessionStorage.setItem("token", token.jwt_token)
    return token.jwt_token
  }

  return (
    <AuthContext.Provider value={{ registerToken }}>
      {children}
    </AuthContext.Provider>
  )
}
