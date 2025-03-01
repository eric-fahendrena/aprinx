import { createContext, useEffect } from "react"
import { fetchUserToken } from "../services/api.js"

export const AuthContext = createContext()
export const AuthProvider = ({ children }) => {
  const getToken = async () => {
    const token = await fetchUserToken()
    localStorage.setItem("token", token.jwt_token)
    console.log("Hello", token)
    return token.jwt_token
  }

  useEffect(() => {
    getToken()
  }, [])

  return (
    <AuthContext.Provider value={{ getToken }}>
      {children}
    </AuthContext.Provider>
  )
}
