import { createContext, useContext, useEffect, useState } from "react"
import { convertUserToTeacherRequest, fetchProfile, getAllUsersRequest, getBoughtCoursesCountRequest, getBoughtCoursesRequest, getPendingSubscriptionTransactionsCountRequest, updatePhoneNumber } from "../services/api"
import { AuthContext } from "./AuthContext"

export const ProfileContext = createContext()
export const ProfileProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthorized, setIsAuthorized] = useState(true)
  const [profile, setProfile] = useState()
  const { registerToken } = useContext(AuthContext)
  const [boughtCoursesCount, setBoughtCoursesCount] = useState()
  const [boughtCourses, setBoughtCourses] = useState([])
  const [boughtCoursesLoading, setBoughtCoursesLoading] = useState(true)
  const [courseTransactionsCount, setCourseTransactionsCount] = useState()
  const [usersOffset, setUsersOffset] = useState(0)
  const [loadingUsers, setLoadingUsers] = useState(true)

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

  const getBoughtCoursesCount = async () => {
    const boughtCoursesCount = await getBoughtCoursesCountRequest()
    return boughtCoursesCount
  }

  const getBoughtCourses = async (offset, limit) => {
    const boughtCourses = await getBoughtCoursesRequest(offset, limit)
    return boughtCourses
  }

  useEffect(() => {
    (async () => {
      await registerToken()
      console.log("Fetch profile...")
      const profile = await fetchProfile()
      if (!profile) {
        setIsAuthorized(false)
        localStorage.setItem("is_authenticated", false)
      } else {
        setIsAuthorized(true)
      }
      setProfile(profile)
      setIsLoading(false)
      localStorage.setItem("is_authenticated", true)
      console.log(profile)
    })()
  }, [])

  return (
    <ProfileContext.Provider value={{ 
      isLoading, 
      isAuthorized, 
      profile, 
      savePhoneNumber, 
      getAllUsers, 
      convertToTeacher,
      boughtCoursesCount,
      setBoughtCoursesCount,
      getBoughtCoursesCount,
      boughtCourses,
      setBoughtCourses,
      getBoughtCourses,
      boughtCoursesLoading,
      setBoughtCoursesLoading,
      courseTransactionsCount,
      setCourseTransactionsCount,
      usersOffset,
      setUsersOffset,
      loadingUsers,
      setLoadingUsers,
    }}>
      {children}
    </ProfileContext.Provider>
  )
}
