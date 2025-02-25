import { createContext, useEffect, useState } from "react"
import { fetchProfile, updatePhoneNumber } from "../services/api"

export const ProfileContext = createContext()
export const ProfileProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [profile, setProfile] = useState({})
  const [error, setError] = useState(false)

  const savePhoneNumber = async (phoneNbData) => {
    const updatedProfile = await updatePhoneNumber(phoneNbData)
    return updatedProfile
  }

  useEffect(() => {
    (async () => {
      setIsLoading(true)
      const data = await fetchProfile()
      if (!data) {
        setError(true)
        setIsLoading(false)
        localStorage.setItem("is_authenticated", false)
        return
      }
      setProfile(data)
      setIsLoading(false)
      localStorage.setItem("is_authenticated", true)
    })()
  }, [])

  return (
    <ProfileContext.Provider value={{ isLoading, profile, error, savePhoneNumber }}>
      {children}
    </ProfileContext.Provider>
  )
}
