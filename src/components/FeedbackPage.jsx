import Header from "./commons/Header"
import { Link } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import Textarea from "./commons/Textarea"
import Checkbox from "./commons/Checkbox"
import Button from "./commons/Button"
import { useContext, useState } from "react"
import { FeedbackContext } from "../contexts/FeedbackContext"
import { ProfileContext } from "../contexts/ProfileContext"
import LgScreenContainer from "./commons/LgScreenContainer"

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
      <Header />
        <div className="px-5 md:hidden">
          <div className="font-[400] text-[1.7rem] mb-3">Votre avis compte !</div>
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

        <LgScreenContainer>
          <div className="px-10">
            <h1 className="font-[400] text-[2rem] mb-3">Votre avis compte !</h1>
            <p className="mb-5">Partagez une suggestion ou signalez un problème pour nous aider à améliorer l'éxperience.</p>
            <div className="lg:w-2/3">
              <div className="mb-3">
                <Textarea 
                  id="feedbackAndSignalement"
                  label="Feedback & Signalement :"
                  placeholder="Décrivez votre avis ou le problème rencontré..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={10}
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
          </div>
        </LgScreenContainer>
    </>
  )
}

export default FeedbackPage
