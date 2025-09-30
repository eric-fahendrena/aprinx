import Header from "./commons/Header"
import Button from "./commons/Button"
import { Link } from "react-router-dom"
import { useContext, useEffect, useRef, useState } from "react"
import { SubscriptionContext } from "../contexts/SubscriptionContext"
import LazyObserver from "./commons/LazyObserver"
import dayjs from "dayjs"

function SubscriptionTransactionsPage() {
  const [detailOpen, setDetailOpen] = useState(false)
  const { getPendingSubscriptionTransactions, confirmSubscriptionTransaction } = useContext(SubscriptionContext)
  const [transactions, setTransactions] = useState([])
  let offset = 0
  let limit = 50
  const [currentTrans, setCurrentTrans] = useState()
  const [confirming, setConfirming] = useState(false)
  const [shouldLoad, setShouldLoad] = useState(true)

  const handleOpenClick = (trans) => {
    setCurrentTrans(trans)
    setDetailOpen(true)
  }
  const handleCloseClick = () => {
    setDetailOpen(false)
    setCurrentTrans(null)
  }
  const handleConfirmClick = async () => {
    // Confirming transaction...
    setConfirming(true)
    const confirmedTrans = await confirmSubscriptionTransaction(currentTrans.id)
    
    setConfirming(false)
    setDetailOpen(false)
  }

  const handleLazyObserverInView = async () => {
    // Getting transactions
    const transactions = await getPendingSubscriptionTransactions(offset, limit)
    setTransactions(prev => {
      return [...prev].concat(transactions)
    })
    if (transactions.length < limit) {
      setShouldLoad(false)
      return
    }
    offset += limit
  }

  return (
    <>
      <Header title={"Transactions"} backLink={"/"} />
      <div className="container mx-auto px-5">
        {transactions && transactions.map((trans, idx) => {
          return (
            <div className="flex p-5 shadow rounded-3xl" key={idx}>
              <div className="w-1/3">
                <div className="w-full h-full bg-zinc-950 rounded-3xl overflow-hidden">
                  <img src={trans.screenshot_url} alt="Capture d'écran" className="w-full h-full object-contain" />
                </div>
              </div>
              <div className="w-2/3 px-3">
                <div className="font-[500] texl-[1.2rem]">{trans.user_name}</div>
                <div className="font-[500] text-[1.3rem] text-zinc-600">{trans.target_amount} Ar</div>
                <div className="text-zinc-600">{dayjs.unix(parseInt(trans.date) / 1000).fromNow()}</div>
                <div className="mt-5">
                  <Button onClick={() => handleOpenClick(trans)}>Ouvrir</Button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {shouldLoad ? (
        <LazyObserver onInView={handleLazyObserverInView} />
      ) : (
        <div className="p-5 text-center text-zinc-600">Aucun élément à charger</div>
      )}

      {detailOpen && (
        <div 
          className="fixed top-0 bottom-0 start-0 end-0 z-[9999] flex items-center justify-center"
          style={{
            backdropFilter: "blur(12px)"
          }}
        >
          {currentTrans && (
            <div className="w-5/6 p-5 bg-white shadow rounded-3xl">
              <div className="font-[500]">{currentTrans.user_name}</div>
              <div className="text-zinc-600 text-sm">{dayjs.unix(parseInt(currentTrans.date) / 1000).fromNow()}</div>
              <div className="text-zinc-600 font-[500] mb-3 text-[1.3rem]">{currentTrans.target_amount} Ar</div>
              <div className="w-full h-[320pt] bg-black rounded-3xl mb-5 overflow-hidden">
                <img src={currentTrans.screenshot_url} alt="Capture d'écran" className="w-full h-full object-contain" />
              </div>
              <div className="flex">
                <div className="w-1/2 pe-1">
                  <Button variant="secondary" onClick={handleCloseClick}>Retour</Button>
                </div>
                <div className="w-1/2">
                  <Button onClick={handleConfirmClick} disabled={confirming}>{confirming ? "..." : "Confirmer"}</Button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default SubscriptionTransactionsPage
