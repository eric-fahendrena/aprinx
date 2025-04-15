import InputText from "../commons/InputText"
import Button from "../commons/Button"
import { useContext, useRef, useState } from "react"
import { ProfileContext } from "../../contexts/ProfileContext"
import { LogIn, Upload } from "lucide-react"
import { TransactionContext } from "../../contexts/TransactionContext"
import { useNavigate } from "react-router-dom"
import { socket } from "../../services/socketService"

function CoursePaymentForm({ courseId, courseAuthorId, price, open, phoneNumber, phoneAssociatedName, onClose, onSaveData }) {
  const { profile } = useContext(ProfileContext)
  const [preview, setPreview] = useState()
  const inputFile = useRef()
  const [file, setFile] = useState()
  const { sendCourseTransaction } = useContext(TransactionContext)
  const navigate = useNavigate()
  const [sending, setSending] = useState(false)

  if (phoneNumber.match(/^261/)) {
    phoneNumber = phoneNumber.replace(/^(261)([0-9]{2})([0-9]{2})([0-9]{3})([0-9]{2})/, "+$1 $2 $3 $4 $5")
  } else if (phoneNumber.match(/^0/)) {
    phoneNumber = phoneNumber.replace(/^([0-9]{3})([0-9]{2})([0-9]{3})([0-9]{2})/, "$1 $2 $3 $4")
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result)
      }
      reader.readAsDataURL(file)
      setFile(file)
    }
  }
  const handleUploadButtonClick = () => {
    inputFile.current.click()
  }
  const handleSendClick = async () => {
    setSending(true)
    const transData = await sendCourseTransaction({
      screenshotFile: file,
      courseId
    })
    console.log("Trans data", transData)
    setSending(false)
    
    console.log("Emitting send notification")
    socket.emit("sendNotification", {
      userId: courseAuthorId,
      courseId: courseId,
      authorNames: profile.name,
      type: "COURSE_TRANSACTION",
    })

    onClose()
  }

  return (
    <>
      {open && (
        <div className="fixed top-0 bottom-0 start-0 end-0 flex items-center justify-center" style={{
          backdropFilter: "blur(2px)"
        }}>
          {!profile ? (
            <div className="w-5/6 md:w-2/3 lg:w-1/3 p-5 border rounded-3xl bg-white text-center shadow-xl">
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
            <div className="w-5/6 md:w-2/3 lg:w-1/3 p-5 border rounded-3xl bg-white shadow-xl">
              <h2 className="text-[1.5rem] font-bold">Acheter le cours</h2>
              <p className="mb-3">Envoyer <strong>{price} Ar</strong> à : <br />
                Tél : <strong>{phoneNumber}</strong> <br /> 
                Nom : <strong>{phoneAssociatedName}</strong>. <br />
                Puis envoyez une photo qui prouve la trasaction réussite</p>
              <input 
                type="file" 
                onChange={handleFileChange} 
                accept="image/*" 
                ref={inputFile}
                className="hidden"
              />
              <div>
                <button className="border px-5 py-1 rounded-3xl" onClick={handleUploadButtonClick}>
                  <Upload size={16} className="inline me-2" />
                  Ajouter une photo
                </button>
              </div>
              {preview && (
                <div className="mt-3">
                  <div className="w-1/3">
                    <div className="w-full h-[80pt] rounded-3xl overflow-hidden bg-zinc-200">
                      <img src={preview} alt="preview" className="w-full h-full object-cover" />
                    </div>
                  </div>
                </div>
              )}
              <div className="mt-5 flex">
                <div className="w-1/2 pe-1">
                  <Button variant="secondary" onClick={onClose}>Retour</Button>
                </div>
                <div className="w-1/2">
                  <Button onClick={handleSendClick} disabled={!preview || sending}>{sending ? "..." : "Envoyer"}</Button>
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
