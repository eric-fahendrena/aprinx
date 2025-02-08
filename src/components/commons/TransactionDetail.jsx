import Button from "./Button"
import Alert from "./Alert"
import { SearchCheck, CircleCheck, Check } from "lucide-react"
import { useState } from "react"
import ShortMessage from "./ShortMessage"

function TransactionDetail({ title="", senderName="", transId="", date="", status="pending", confirmed=false }) {
  const [buttonDisabled, setButtonDisabled] = useState(false)
  const [buttonVisible, setButtonVisible] = useState(true)

  /** 
   * confirm
   * 
   * This function is, for now, just a simulator
   */
  function confirm(e) {
    e.target.innerText = "..."
    setButtonDisabled(true)
    setTimeout(() => {
      setButtonVisible(false)
    }, 2000)
  }

  return (
    <div className="">
      <Alert 
        type={confirmed ? "success" : "primary"} 
        icon={confirmed ? <CircleCheck size={40} /> : <SearchCheck size={40} />}
      >
        <div className="text-2xl">{senderName}</div>
        <div className="text-zinc-600">{title}</div>
        <div className="py-5">
          <ul>
            <li><span className="text-zinc-600 font-bold">Trans. ID</span> : <code>{transId}</code></li>
            <li><span className="text-zinc-600 font-bold">Date d'envoi</span> : {date}</li>
          </ul>
        </div>
        <div className="mt-5">
          {confirmed ? (
            <ShortMessage icon={<Check />}>
              Confirmée
            </ShortMessage>
          ) : (
            <>
              {buttonVisible ? (
                <Button onClick={confirm} disabled={buttonDisabled}>Confirmer</Button>
              ) : (
                <ShortMessage icon={<Check />}>
                  Confirmée
                </ShortMessage>
              )}
            </>
          )}
        </div>
      </Alert>
    </div>
  )
}

export default TransactionDetail
