import { createContext, useState } from "react";
import { getCreatedCoursesRequest } from "../services/api";

export const CreatedCourseContext = createContext()
export const CreatedCourseProvider = ({ children }) => {
  const [createdCourses, setCreatedCourses] = useState([])
  const [loadingCreatedCourses, setLoadingCreatedCourses] = useState(true)

  const getCreatedCourses = async (offset, limit) => {
    const createdCourses = await getCreatedCoursesRequest(offset, limit)
    return createdCourses
  }

  return (
    <CreatedCourseContext.Provider
      value={{
        createdCourses,
        setCreatedCourses,
        getCreatedCourses,
        loadingCreatedCourses,
        setLoadingCreatedCourses,
      }}
    >
      {children}
    </CreatedCourseContext.Provider>
  )
}