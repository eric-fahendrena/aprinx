import LazyObserver from "../commons/LazyObserver"
import InputText from "../commons/InputText"
import Textarea from "../commons/Textarea"
import Button from "../commons/Button"
import { useContext, useEffect, useState } from "react"
import { ProfileContext } from "../../contexts/ProfileContext"
import { TransactionContext } from "../../contexts/TransactionContext"
import dayjs from "dayjs"

function CourseTransactionsManager({ courseId }) {
  const { getCourseTransactions, getCourseTransactionCount, confirmCourseTransaction } = useContext(TransactionContext)
  const [transactions, setTransactions] = useState([])
  const [transactionCount, setTransactionCount] = useState()
  const [transactionDetailOpen, setTransactionDetailOpen] = useState(false)
  const [currentTransactionDetail, setCurrentTransactionDetail] = useState()
  const [confirming, setConfirming] = useState(false)
  let offset = 0
  let limit = 10

  const handleObserverInView = async () => {
    const transactions = await getCourseTransactions(offset, limit)
    if (transactions) {
      setTransactions(prev => {
        return [...prev].concat(transactions)
      })
      offset += 10
    }
  }

  const handleOpenClick = (trans) => {
    setCurrentTransactionDetail(trans)
    setTransactionDetailOpen(true)
  }

  const handleCloseClick = () => {
    setTransactionDetailOpen(false)
  }

  const handleConfirmClick = async (transId) => {
    setConfirming(true)
    const confirmedTransaction = await confirmCourseTransaction(transId)
    console.log("Confirmed transaction", confirmedTransaction)
    setConfirming(false)
    setTransactionDetailOpen(false)
  }

  useEffect(() => {
    (async () => {
      const transactionCount = await getCourseTransactionCount()
      setTransactionCount(transactionCount)
    })()
  }, [])

  return (
    <div className="h-full">
      <div className="font-[500] mb-5">Transaction pour les cours ({transactionCount})</div>
      <div>
        {transactions && transactions.map((trans, idx) => {
          const dateSeconds = parseInt(trans.date) / 1000
          
          return (
            <div className="mb-3 p-4 border rounded-3xl flex" key={idx}>
              <div className="w-1/3">
                <div className="w-full h-[80pt] rounded-3xl bg-black overflow-hidden">
                  <img src={trans.screenshot_url} alt="Capture d'écran" className="w-full h-full object-contain" />
                </div>
              </div>
              <div className="w-2/3 px-5">
                <div className="font-[500]">{trans.buyer_name}</div>
                <div className="text-zinc-600 mb-3">{dayjs.unix(dateSeconds).fromNow()}</div>
                {trans.status === "CONFIRMED" && (
                  <div className="text-green-600">Confirmée</div>
                )}
                {trans.status === "PENDING" && (
                  <Button onClick={() => handleOpenClick(trans)}>Ouvrir</Button>
                )}
              </div>
            </div>
          )
        })}
      </div>
      <LazyObserver onInView={handleObserverInView} />

      {transactionDetailOpen && (
        <div 
          className="fixed top-0 bottom-0 start-0 end-0 flex items-center justify-center"
          style={{
            backdropFilter: "blur(15px)"
          }}
        >
          {currentTransactionDetail && (
            <div className="bg-white p-5 rounded-3xl w-5/6 shadow">
              <div className="font-[500]">{currentTransactionDetail.buyer_name}</div>
              <div className="mb-5 text-zinc-600 text-sm">{dayjs.unix(parseInt(currentTransactionDetail.date) / 1000).fromNow()}</div>
              <div className="h-[320pt] mb-5 bg-black rounded-3xl">
                <img src={currentTransactionDetail.screenshot_url} alt="Capture d'écran du preuve" className="w-full h-full object-contain" />
              </div>
              <div className="flex">
                <div className="w-1/2 pe-1">
                  <Button variant="secondary" onClick={handleCloseClick} disabled={confirming}>Fermer</Button>
                </div>
                <div className="w-1/2">
                  <Button onClick={() => handleConfirmClick(currentTransactionDetail.id)} disabled={confirming}>{confirming ? "..." : "Confirmer"}</Button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default CourseTransactionsManager
