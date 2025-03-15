import LazyObserver from "../commons/LazyObserver"
import InputText from "../commons/InputText"
import Textarea from "../commons/Textarea"
import Button from "../commons/Button"
import { useContext, useState } from "react"
import { TransactionContext } from "../../contexts/TransactionContext"
import { CourseAccessContext } from "../../contexts/CourseAccessContext"
import { socket } from "../../services/socketService"
import { ProfileContext } from "../../contexts/ProfileContext"

function CourseTransactionsManager({ courseId }) {
  const { profile } = useContext(ProfileContext)
  const [refused, setRefused] = useState(false)
  const [transIdIpt, setTransIdIpt] = useState("")
  const [verifying, setVerifying] = useState(false)
  const { verifyTransaction, confirmTransaction, refuseTransaction } = useContext(TransactionContext)
  const [transaction, setTransaction] = useState(null)
  const { createCourseAccess } = useContext(CourseAccessContext)
  const [confirming, setConfirming] = useState(false)
  const [refusalMessageInput, setRefusalMessageInput] = useState("")

  const handleVerifyClick = async () => {
    setVerifying(true)
    const trans = await verifyTransaction(transIdIpt)
    setVerifying(false)
    if (!trans) {
      setTransaction(null)
      return
    }
    setTransaction(trans)
  }

  const handleRefuseClick = () => {
    setRefused(true)
  }

  const handleUndoRefusedClick = () => {
    setRefused(false)
  }

  const handleConfirmClick = async () => {
    setConfirming(true)
    const confirmedTrans = await confirmTransaction(transaction.trans_id)
    console.log("Transaction confirmed !")
    if (confirmedTrans) {
      const courseAccess = await createCourseAccess(confirmedTrans.course_id, confirmedTrans.buyer_id)
      if (courseAccess) {
        socket.emit("sendCourseAccessNotification", { 
          courseId: courseAccess.course_id,
          userId: courseAccess.user_id,
          authorNames: `${profile.name}`,
        })
      }
    }
    transaction.status = confirmedTrans.status
    setConfirming(false)
  }

  const handleRefusalMessageChange = (e) => {
    setRefusalMessageInput(e.target.value)
  }

  const handleSendRefusalClick = async () => {
    const refusedTrans = await refuseTransaction(transIdIpt)
  }

  return (
    <div>
      <div className="mb-10">
        <div className="mb-3">
          <InputText 
            label="ID de transaction"
            placeholder="Entrez l'ID de transaction"
            value={transIdIpt}
            onChange={e => setTransIdIpt(e.target.value)}
          />
        </div>
        <div>
          <Button onClick={handleVerifyClick}>{verifying ? "..." : "Verifier"}</Button>
        </div>
      </div>

      {transaction && (
        <div className="flex border p-3 rounded-3xl mb-3">
          <div className="w-1/5">
            <div className="w-[32pt] h-[32pt] bg-zinc-700 rounded-full"></div>
          </div>
          <div className="w-4/5">
            <div className="font-bold">{transaction.buyer_name}</div>
            <div className="">Trans. ID : <strong className="text-red-800">{transaction.trans_id}</strong></div>
            <div className="">Exp. : <strong className="text-red-800">{transaction.trans_exp_name}</strong></div>
            <div className="text-zinc-600">{transaction.date}</div>
            {transaction.status === "confirmed" && (
              <div className="text-green-600 text-sm">Confirmée</div>
            )}
          </div>
        </div>
      )}

      {!refused ? (
        <>
          {transaction && (
            <>
              {transaction.status === "pending" && (
                <div className="flex py-3">
                  <div className="px-1 w-1/2">
                    <Button 
                      variant="secondary" 
                      disabled={refused}
                      onClick={handleRefuseClick}
                    >Réfuser</Button>
                  </div>
                  <div className="px-1 w-1/2">
                    <Button disabled={refused} onClick={handleConfirmClick}>{confirming ? "..." : "Confirmer"}</Button>
                  </div>
                </div>
              )}
            </>
          )}
        </>
      ) : (
        <div className="py-3">
          <div className="mb-3">
            <Textarea
              id="refusalMessageInput"
              label="Message de refus"
              placeholder="Message de refus"
              value={refusalMessageInput}
              onChange={handleRefusalMessageChange}
            ></Textarea>
          </div>
          <div className="flex">
            <div className="w-1/2 px-1">
              <Button variant="secondary" onClick={handleUndoRefusedClick}>Annuler</Button>
            </div>
            <div className="w-1/2 px-1">
              <Button>Envoyer</Button>
            </div>
          </div>
        </div>
      )}
      {/* <LazyObserver /> */}
    </div>
  )
}

export default CourseTransactionsManager
