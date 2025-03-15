import { createContext, useContext, useEffect } from "react";
import { createCourseCommentRequest, getCourseCommentsRequest } from "../services/api";
import { AuthContext } from "./AuthContext";

export const CommentContext = createContext()
export const CommentProvider = ({ children }) => {
  const { registerToken } = useContext(AuthContext)
  const createCourseComment = async (cId, cmtData) => {
    const comment = await createCourseCommentRequest(cId, cmtData)
    return comment
  }

  const getCourseComments = async (cId, query) => {
    const comments = await getCourseCommentsRequest(cId, query);
    return comments
  }
  useEffect(() => {
    (async () => {
      await registerToken()
    })()
  }, [])

  return (
    <CommentContext.Provider value={{ createCourseComment, getCourseComments }}>
      {children}
    </CommentContext.Provider>
  )
}
