import { createContext, useContext, useEffect } from "react"
import { confirmTransactionRequest, getTransactionRequest, refuseTransactionRequest, sendTransaction } from "../services/api"
import { AuthContext } from "./AuthContext"

export const TransactionContext = createContext()
export const TransactionProvider = ({ children }) => {
  const { registerToken } = useContext(AuthContext)
  const saveTransaction = async (tData) => {
    const trans = await sendTransaction(tData)
    return trans
  }

  const verifyTransaction = async (transId) => {
    const trans = await getTransactionRequest(transId)
    return trans
  }

  const confirmTransaction = async (transId) => {
    const transaction = await confirmTransactionRequest(transId)
    return transaction
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
    <TransactionContext.Provider value={{ saveTransaction, verifyTransaction, confirmTransaction, refuseTransaction }}>
      {children}
    </TransactionContext.Provider>
  )
}
