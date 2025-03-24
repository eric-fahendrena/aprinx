import { createContext } from "react";
import { getSubscriptionRequest } from "../services/api";

export const SubscriptionContext = createContext()
export const SubscriptionProvider = ({ children }) => {
  const getSubscription = async (userId) => {
    const subscription = await getSubscriptionRequest(userId)
    return subscription
  }

  return (
    <SubscriptionContext.Provider value={{ getSubscription }}>
      {children}
    </SubscriptionContext.Provider>
  )
}
