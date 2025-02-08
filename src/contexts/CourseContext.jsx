import { createContext, useEffect, useState } from "react";
import { addCourse, fetchAllCourses, fetchCourse } from "../services/api";

export const CourseContext = createContext()
export const CourseProvider = ({ children }) => {
  const [allCourses, setAllCourses] = useState(null)
  const createCourse = async (data) => {
    await addCourse(data)
  }
  const getCourse = async (cId) => {
    const course = await fetchCourse(cId)
    return course
  }

  useEffect(() => {
    (async () => {
      const allCourses = await fetchAllCourses()
      setAllCourses(allCourses)
    })()
  }, [])

  return (
    <CourseContext.Provider value={{ createCourse, getCourse, allCourses }}>
      {children}
    </CourseContext.Provider>
  )
}
