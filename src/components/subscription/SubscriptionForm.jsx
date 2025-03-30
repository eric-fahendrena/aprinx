import { useContext, useRef, useState } from "react"
import Button from "../commons/Button"
import { Upload } from "lucide-react"
import { SubscriptionContext } from "../../contexts/SubscriptionContext"

function SubscriptionForm({ subscription, paymentInfos, onClose}) {
  const [proofFile, setProofFile] = useState()
  const [proofPreview, setProofPreview] = useState()
  const fileInputRef = useRef()
  const [sending, setSending] = useState(false)
  const { createSubscriptionTransaction } = useContext(SubscriptionContext)

  const handleUploadClick = () => {
    fileInputRef.current.click()
  }
  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProofPreview(reader.result)
      }
      reader.readAsDataURL(file)
      setProofFile(file)
    }
  }
  const handleSendClick = async () => {
    setSending(true)
    const transaction = await createSubscriptionTransaction({
      screenshotFile: proofFile,
      targetAmount: subscription.next_payment_amount,
    })
    console.log("Subscription transaction", transaction)
    setSending(false)
    onClose()
  }

  return (
    <div 
      className="fixed top-0 bottom-0 start-0 end-0 z-[9999] flex items-center justify-center"
      style={{
        backdropFilter: "blur(12px)",
      }}
    >
      <div className="w-5/6 p-5 rounded-3xl bg-white shadow">
        <div className="font-[500] mb-3">Rénouvellement de l'abonnement</div>
        <p className="mb-3">Veuillez envoyer {subscription.next_payment_amount} Ar au numéro {paymentInfos.phoneNumber} ({paymentInfos.holderName}), puis envoyer la preuve.</p>
        <div className="mb-5">
          <input type="file" className="hidden" ref={fileInputRef} accept="image/*" onChange={handleFileChange} />
          <button className="inline-block px-3 py-1 border rounded-3xl" onClick={handleUploadClick}>
            <Upload className="inline me-2" size={16} />
            Choisir une photo
          </button>
        </div>
        {proofPreview && (
          <div className="mb-5">
            <img src={proofPreview} alt="Aperçu de la preuve" className="w-[80pt] h-[80pt] object-cover shadow rounded-3xl" />
          </div>
        )}
        <div className="flex">
          <div className="w-1/2 pe-1">
            <Button variant="secondary" onClick={onClose}>Retour</Button>
          </div>
          <div className="w-1/2">
            <Button disabled={!proofFile || sending} onClick={handleSendClick}>{sending ? "..." : "Envoyer"}</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SubscriptionForm
