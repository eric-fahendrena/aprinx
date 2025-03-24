import { createContext, useContext, useEffect, useState } from "react"
import { convertUserToTeacherRequest, fetchProfile, getAllUsersRequest, updatePhoneNumber } from "../services/api"
import { AuthContext } from "./AuthContext"

export const ProfileContext = createContext()
export const ProfileProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [profile, setProfile] = useState({})
  const [error, setError] = useState(false)
  const { registerToken } = useContext(AuthContext)

  const savePhoneNumber = async (phoneNbData) => {
    const updatedProfile = await updatePhoneNumber(phoneNbData)
    return updatedProfile
  }

  const getAllUsers = async (offset, limit) => {
    const users = await getAllUsersRequest(offset, limit)
    return users
  }

  const convertToTeacher = async (userId) => {
    const convertedUser = await convertUserToTeacherRequest(userId)
    return convertedUser
  }

  useEffect(() => {
    (async () => {
      await registerToken()
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
    <ProfileContext.Provider value={{ isLoading, profile, error, savePhoneNumber, getAllUsers, convertToTeacher }}>
      {children}
    </ProfileContext.Provider>
  )
}
