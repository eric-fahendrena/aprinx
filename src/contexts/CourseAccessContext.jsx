import { createContext } from "react";
import { createCourseAccessRequest, getCourseAccessRequest } from "../services/api";

export const CourseAccessContext = createContext()
export const CourseAccessProvider = ({ children }) => {
  const createCourseAccess = async (CourseId, userId) => {
    const courseAccess = await createCourseAccessRequest(CourseId, userId)
    return courseAccess
  }

  const getCourseAccess = async (courseId) => {
    const courseAccess = await getCourseAccessRequest(courseId)
    return courseAccess
  }

  return (
    <CourseAccessContext.Provider value={{ createCourseAccess, getCourseAccess }}>
      {children}
    </CourseAccessContext.Provider>
  )
}
