import { createContext, useState } from "react";
import { createFeedbackRequest, getAllFeedbacksRequest } from "../services/api";

export const FeedbackContext = createContext()
export const FeedbackProvider = ({ children }) => {
  const [loadingFeedbacks, setLoadingFeedbacks] = useState(true)
  const [feedbacks, setFeedbacks] = useState([])

  const createFeedback = async (data) => {
    const feedback = await createFeedbackRequest(data)
    return feedback
  }

  const getAllFeedbacks = async (offset, limit) => {
    const feedbacks = await getAllFeedbacksRequest(offset, limit)
    return feedbacks
  }

  return (
    <FeedbackContext.Provider 
      value={{
        createFeedback,
        getAllFeedbacks,
        feedbacks,
        setFeedbacks,
        loadingFeedbacks,
        setLoadingFeedbacks,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  )
}