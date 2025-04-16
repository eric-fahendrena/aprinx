import LazyObserver from "../commons/LazyObserver"
import Button from "../commons/Button"
import { useContext, useEffect, useState } from "react"
import { ProfileContext } from "../../contexts/ProfileContext"
import { TransactionContext } from "../../contexts/TransactionContext"
import dayjs from "dayjs"
import { Link } from "react-router-dom"
import { socket } from "../../services/socketService"

function CourseTransactionsManager() {
  const { getCourseTransactions, getCourseTransactionCount, confirmCourseTransaction } = useContext(TransactionContext)
  const [transactions, setTransactions] = useState([])
  const [transactionCount, setTransactionCount] = useState()
  const [transactionDetailOpen, setTransactionDetailOpen] = useState(false)
  const [currentTransactionDetail, setCurrentTransactionDetail] = useState()
  const [confirming, setConfirming] = useState(false)
  const [loading, setLoading] = useState(true)
  let offset = 0
  let limit = 10
  const { profile } = useContext(ProfileContext)

  const handleObserverInView = async () => {
    const transactions = await getCourseTransactions(offset, limit)
    if (transactions) {
      setTransactions(prev => {
        return [...prev].concat(transactions)
      })
      offset += limit

      if (transactions.length < limit) {
        setLoading(false)
        offset = 0
      }
    }
  }

  const handleOpenClick = (trans) => {
    setCurrentTransactionDetail(trans)
    setTransactionDetailOpen(true)
  }

  const handleCloseClick = () => {
    setTransactionDetailOpen(false)
  }

  const handleConfirmClick = async (trans) => {
    setConfirming(true)
    const confirmedTransaction = await confirmCourseTransaction(trans.id)
    console.log("Confirmed transaction", confirmedTransaction)
    setConfirming(false)
    setTransactionDetailOpen(false)
    trans.status = "CONFIRMED"

    socket.emit("sendNotification", {
      userId: trans.buyer_id,
      courseId: trans.course_id,
      authorNames: profile.name,
      type: "COURSE_TRANSACTION_CONFIRMATION",
    })

    socket.emit("sendNotification", {
      userId: trans.buyer_id,
      courseId: trans.course_id,
      authorNames: profile.name,
      type: "COURSE_ACCESS",
    })
  }

  useEffect(() => {
    (async () => {
      const transactionCount = await getCourseTransactionCount()
      setTransactionCount(transactionCount)
    })()
  }, [])

  return (
    <div className="h-full w-full">
      <div className="font-[500] mb-5">Transaction pour les cours ({transactionCount})</div>
      <div className="flex flex-wrap">
        {transactions && transactions.map((trans, idx) => {
          const dateSeconds = parseInt(trans.date) / 1000
          
          return (
            <div className="w-full md:w-1/2 lg:w-1/3 pe-2" key={idx}>
              <div className="w-full mb-3 p-4 border rounded-3xl flex ">
                <div className="w-1/3">
                  <div className="w-full h-[80pt] rounded-3xl bg-black overflow-hidden">
                    <img src={trans.screenshot_url} alt="Capture d'écran" className="w-full h-full object-contain" />
                  </div>
                </div>
                <div className="w-2/3 px-5">
                  <div className="font-[500]">{trans.buyer_name}</div>
                  <div className="text-zinc-600">Tarif : <strong className="text-green-600">{trans.amount} Ar</strong></div>
                  <div className="text-zinc-600 mb-3">{dayjs.unix(dateSeconds).fromNow()}</div>
                  {trans.status === "CONFIRMED" && (
                    <div className="text-green-600">Confirmée</div>
                  )}
                  {trans.status === "PENDING" && (
                    <Button onClick={() => handleOpenClick(trans)}>Ouvrir</Button>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {loading && (
        <LazyObserver onInView={handleObserverInView} />
      )}

      {(!loading && transactions.length <= 0) && (
        <div className="text-zinc-600 text-sm py-5 text-center">
          Aucun élément à charger
        </div>
      )}

      {transactionDetailOpen && (
        <div 
          className="fixed top-0 bottom-0 start-0 end-0 flex items-center justify-center"
          style={{
            backdropFilter: "blur(15px)"
          }}
        >
          {currentTransactionDetail && (
            <div className="w-5/6 md:w-2/3 lg:w-1/2 bg-white p-5 rounded-3xl shadow">
              <div className="font-[500]">{currentTransactionDetail.buyer_name}</div>
              <div className="text-sm">Cours : <strong>{currentTransactionDetail.course_title}</strong></div>
              <div className="text-sm text-zinc-600">
                Tarif : <strong className="text-green-600">{currentTransactionDetail.amount} Ar</strong>
              </div>
              <div className="mb-5 text-zinc-600 text-xs">{dayjs.unix(parseInt(currentTransactionDetail.date) / 1000).fromNow()}</div>
              <Link to={currentTransactionDetail.screenshot_url} target="__blank" className="block h-[240pt] mb-5 bg-black rounded-3xl">
                <img src={currentTransactionDetail.screenshot_url} alt="Capture d'écran du preuve" className="w-full h-full object-contain" />
              </Link>
              <div className="flex">
                <div className="w-1/2 pe-1">
                  <Button variant="secondary" onClick={handleCloseClick} disabled={confirming}>Fermer</Button>
                </div>
                <div className="w-1/2">
                  <Button onClick={() => handleConfirmClick(currentTransactionDetail)} disabled={confirming}>{confirming ? "..." : "Confirmer"}</Button>
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
