import { createContext } from "react";
import { createDeletedCourseRequest } from "../services/api";

export const DeletedCourseContext = createContext()
export const DeletedCourseProvider = ({ children }) => {
  const createDeletedCourse = async (dcData) => {
    const deletedCourse = await createDeletedCourseRequest(dcData)
    return deletedCourse
  }
  return (
    <DeletedCourseContext.Provider value={{ createDeletedCourse }}>
      {children}
    </DeletedCourseContext.Provider>
  )
}
