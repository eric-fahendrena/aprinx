import InputText from "../commons/InputText"
import Button from "../commons/Button"
import { useContext, useState } from "react"
import { TransactionContext } from "../../contexts/TransactionContext"
import { ProfileContext } from "../../contexts/ProfileContext"
import { LogIn, UserCircle } from "lucide-react"
import { useNavigate } from "react-router-dom"

function CoursePaymentForm({ courseId, buyerId, price, open, phoneNumber, phoneAssociatedName, onClose, onSaveData }) {
  const { profile } = useContext(ProfileContext)
  const { saveTransaction } = useContext(TransactionContext)
  const [transIdIpt, setTransIdIpt] = useState("")
  const [transExpName, setTransExpName] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  
  const save = async () => {
    const tData = new Object()
    tData.course_id = courseId
    tData.buyer_id = buyerId
    tData.trans_id = transIdIpt
    tData.trans_exp_name = transExpName
    tData.status = "pending"

    console.log("Saving...")
    setIsLoading(true)
    const savedTrans = await saveTransaction(tData)
    console.log("Saving finished")
    setIsLoading(false)
    console.log(savedTrans)
    onSaveData && onSaveData(savedTrans)
  }

  return (
    <>
      {open && (
        <div className="fixed top-0 bottom-0 start-0 end-0 p-5 flex items-center justify-center" style={{
          backdropFilter: "blur(2px)"
        }}>
          {!profile.id ? (
            <div className="p-5 border rounded-3xl bg-white w-full text-center shadow-xl">
              <div className="py-5"><LogIn className="inline-block" size={40} /></div>
              <p className="text-[1.5rem] mb-5">Veuillez d'abord vous connecter</p>
              <div className="flex">
                <div className="w-1/2 px-1">
                  <Button variant="secondary" onClick={onClose}>Retour</Button>
                </div>
                <div className="w-1/2 px-1">
                  <Button onClick={() => navigate("/login")}>Connexion</Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-5 border rounded-3xl bg-white w-full shadow-xl">
              <h2 className="text-[1.5rem] font-bold">Acheter le cours</h2>
              <p className="mb-3">Envoyer {price} ariary à {phoneNumber} ({phoneAssociatedName}), puis entrez l'ID de Transaction ainsi que le nom d'éxpediteur.</p>
              <div className="mb-3">
                <InputText 
                  id="transIdIpt"
                  label="ID de transaction"
                  placeholder="ID de transaction"
                  value={transIdIpt}
                  onChange={(e) => setTransIdIpt(e.target.value)}
                />
              </div>
              <div className="mb-5">
                <InputText 
                  id="transExpNameIpt"
                  label="Nom associé au numero"
                  placeholder="Nom associé au numero de téléphone"
                  value={transExpName}
                  onChange={(e) => setTransExpName(e.target.value)}
                />
              </div>
              <div className="flex">
                <div className="w-1/2 px-1">
                  <Button variant="secondary" disabled={isLoading} onClick={onClose}>Annuler</Button>
                </div>
                <div className="w-1/2 px-1">
                  <Button 
                    disabled={isLoading}
                    onClick={save}
                  >
                    {isLoading ? "..." : "Enregistrer"}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default CoursePaymentForm
