import { createContext } from "react"
import { fetchTransaction, sendTransaction } from "../services/api"

export const TransactionContext = createContext()
export const TransactionProvider = ({ children }) => {
  const saveTransaction = async (tData) => {
    const trans = await sendTransaction(tData)
    return trans
  }

  const verifyTransaction = async (transId) => {
    const trans = await fetchTransaction(transId)
    return trans
  }

  return (
    <TransactionContext.Provider value={{ saveTransaction, verifyTransaction }}>
      {children}
    </TransactionContext.Provider>
  )
}
