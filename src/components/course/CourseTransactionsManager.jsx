import LazyObserver from "../commons/LazyObserver"
import InputText from "../commons/InputText"
import Textarea from "../commons/Textarea"
import Button from "../commons/Button"
import { useContext, useState } from "react"
import { TransactionContext } from "../../contexts/TransactionContext"
import { NotebookPen } from "lucide-react"

function CourseTransactionsManager({ courseId }) {
  const [refused, setRefused] = useState(false)
  const [transIdIpt, setTransIdIpt] = useState("")
  const [verifying, setVerifying] = useState(false)
  const { verifyTransaction } = useContext(TransactionContext)
  const [transaction, setTransaction] = useState(null)

  const verify = async () => {
    setVerifying(true)
    const trans = await verifyTransaction(transIdIpt)
    setVerifying(false)
    if (trans.error)
      return
    setTransaction(trans)
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
          <Button onClick={verify}>{verifying ? "..." : "Verifier"}</Button>
        </div>
      </div>

      {transaction && (
        <div className="flex border p-3 rounded-xl">
          <div className="w-1/5">
            <div className="w-[32pt] h-[32pt] bg-zinc-700 rounded-full"></div>
          </div>
          <div className="w-4/5">
            <div className="font-bold">{transaction.buyer_name}</div>
            <div className="">Trans. ID : <strong className="text-red-800">{transaction.trans_id}</strong></div>
            <div className="">Exp. : <strong className="text-red-800">{transaction.trans_exp_name}</strong></div>
            <div className="text-zinc-600">{transaction.date}</div>
          </div>
        </div>
      )}

      {!refused ? (
        <>
          {transaction && (
            <div className="flex py-3">
              <div className="px-1 w-1/2">
                <Button 
                  variant="secondary" 
                  disabled={refused}
                  onClick={(e) => setRefused(true)}
                >Réfuser</Button>
              </div>
              <div className="px-1 w-1/2">
                <Button disabled={refused}>Confirmer</Button>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="py-3">
          <div className="mb-3">
            <Textarea
              label="Message de refus"
              placeholder="Message de refus"
            ></Textarea>
          </div>
          <div className="flex">
            <div className="w-1/2 px-1">
              <Button variant="secondary">Annuler</Button>
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
