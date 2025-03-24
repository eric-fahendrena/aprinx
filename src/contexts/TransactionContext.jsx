import { createContext, useContext, useEffect } from "react"
import { confirmCourseTransactionRequest, getCourseTransactionCountRequest, getCourseTransactionsRequest, getTransactionRequest, refuseTransactionRequest, sendCourseTransactionRequest, uploadFileRequest } from "../services/api"
import { AuthContext } from "./AuthContext"

export const TransactionContext = createContext()
export const TransactionProvider = ({ children }) => {
  const { registerToken } = useContext(AuthContext)
  
  const sendCourseTransaction = async (data) => {
    const screenshotUploadData = await uploadFileRequest(data.screenshotFile, "image")
    data.screenshotUrl = screenshotUploadData.url
    const trans = await sendCourseTransactionRequest(data)
    return trans
  }
  const getCourseTransactions = async (offset, limit) => {
    const transactions = await getCourseTransactionsRequest(offset, limit)
    return transactions
  }
  const getCourseTransactionCount = async () => {
    const count = await getCourseTransactionCountRequest()
    return count
  }
  
  const confirmCourseTransaction = async (transId) => {
    const confirmedTrans = await confirmCourseTransactionRequest(transId)
    return confirmedTrans
  }

  const verifyTransaction = async (transId) => {
    const trans = await getTransactionRequest(transId)
    return trans
  }


  const refuseTransaction = async (transId) => {
    const refusedTrans = await refuseTransactionRequest(transId)
    return refusedTrans
  }

  useEffect(() => {
    (async () => {
      await registerToken()
    })()
  }, [])

  return (
    <TransactionContext.Provider value={{ sendCourseTransaction, getCourseTransactions, getCourseTransactionCount, verifyTransaction, confirmCourseTransaction, refuseTransaction }}>
      {children}
    </TransactionContext.Provider>
  )
}
