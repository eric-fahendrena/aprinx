import { Link } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import Textarea from "./commons/Textarea"
import Checkbox from "./commons/Checkbox"
import Button from "./commons/Button"
import { useContext, useState } from "react"
import { FeedbackContext } from "../contexts/FeedbackContext"
import { ProfileContext } from "../contexts/ProfileContext"

function FeedbackPage() {
  const [message, setMessage] = useState("")
  const [anonymous, setAnonymous] = useState(false)
  const [sending, setSending] = useState(false)
  const { createFeedback } = useContext(FeedbackContext)
  const { profile } = useContext(ProfileContext)

  const handleSendClick = async () => {
    setSending(true)
    const feedback = {
      authorId: anonymous ? null : (profile ? profile.id : null),
      message,
    }
    console.log(feedback)
    console.log("Creating feedback...")
    const createdFeedback = await createFeedback(feedback)
    console.log("Created feedback", createdFeedback)
    setSending(false)
    setMessage("")
  }

  return (
    <>
      <header className="px-5 md:mx-40 lg:mx-60 sticky top-0 py-3 bg-[#800] text-white z-10">
        <div className="font-[500]">
          <Link to={"/"}>
            <ArrowLeft className="inline me-2" />
          </Link>
          Feedback et Signalement
        </div>
      </header>
      <div className="container mx-auto p-5">
        <div className="font-[400] mb-3">Votre avis compte !</div>
        <p className="mb-5">Partagez une suggestion ou signalez un problème pour nous aider à améliorer l'éxperience.</p>
        <div className="mb-3">
          <Textarea 
            label="Feedback & Signalement :"
            placeholder="Décrivez votre avis ou le problème rencontré..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <Checkbox
            label={"Anonyme"}
            id={"anonymous"}
            name={"anonymous"}
            value={anonymous}
            onChange={(e) => setAnonymous(e.target.checked)}
            disabled={!profile}
            defaultChecked={!profile}
          />
        </div>
        <div className="">
          <Button disabled={!message || sending} onClick={handleSendClick}>{sending ? "..." : "Envoyer"}</Button>
        </div>
      </div>
    </>
  )
}

export default FeedbackPage
