import { createContext, useContext, useEffect, useState } from "react";
import { getSubscriptionRequest, uploadFileRequest, createSubscriptionTransactionRequest, getPendingSubscriptionTransactionsRequest, confirmSubscriptionTransactionRequest, getPendingSubscriptionTransactionsCountRequest } from "../services/api";
import { ProfileContext } from "./ProfileContext";

export const SubscriptionContext = createContext()
export const SubscriptionProvider = ({ children }) => {
  const { profile } = useContext(ProfileContext)
  const [subscription, setSubscription] = useState()
  
  const paymentInfos = {
    phoneNumber: "0339933134",
    holderName: "Razanampahendrena Jean Eric",
  }

  const getSubscription = async (userId) => {
    const subscription = await getSubscriptionRequest(userId)
    return subscription
  }

  const createSubscriptionTransaction = async (tData) => {
    console.log("Uploading screenshot...");
    const screenshotUpdloadData = await uploadFileRequest(tData.screenshotFile, "image");
    const transaction = await createSubscriptionTransactionRequest({
      screenshotUrl: screenshotUpdloadData.url,
      targetAmount: tData.targetAmount,
    })
    return transaction
  }

  const getPendingSubscriptionTransactions = async (offset, limit) => {
    const pendingTransactions = await getPendingSubscriptionTransactionsRequest(offset, limit)
    return pendingTransactions
  }
  
  const confirmSubscriptionTransaction = async (transId) => {
    const confirmedTrans = await confirmSubscriptionTransactionRequest(transId)
    return confirmedTrans
  }

  const getPendingSubscriptionTransactionsCount = async () => {
    const psCount = await getPendingSubscriptionTransactionsCountRequest()
    return psCount
  }

  useEffect(() => {
    (async () => {
      if (profile) {
        const subscription = await getSubscription(profile.id)
        setSubscription(subscription)
      }
    })()
  }, [profile])

  return (
    <SubscriptionContext.Provider 
      value={{ 
        subscription,
        getSubscription, 
        paymentInfos, 
        createSubscriptionTransaction, 
        getPendingSubscriptionTransactions, 
        confirmSubscriptionTransaction,
        getPendingSubscriptionTransactionsCount,
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  )
}
