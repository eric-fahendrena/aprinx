import { createContext, useEffect, useState } from "react"
import { fetchProfile } from "../services/api"

export const ProfileContext = createContext()
export const ProfileProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [profile, setProfile] = useState({})
  const [error, setError] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    fetchProfile().then(data => {
      if (!data) {
        setError(true)
        return
      }
      setProfile(data)
      setIsLoading(false)
    })
  }, [])

  return (
    <ProfileContext.Provider value={{ isLoading, profile, error }}>
      {children}
    </ProfileContext.Provider>
  )
}
