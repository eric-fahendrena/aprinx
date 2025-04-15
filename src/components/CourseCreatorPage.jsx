import Button from "./commons/Button"
import CoverPhotoUploader from "./course/creator/CoverPhotoUploader"
import MetadataForm from "./course/creator/MetadataForm"
import { useNavigate } from "react-router-dom"
import { useContext, useState } from "react"
import { CourseContext } from "../contexts/CourseContext"
import FullScreenLoader from "./commons/FullScreenLoader"
import FullScreenStatus from "./commons/FullScreenStatus"
import { ProfileContext } from "../contexts/ProfileContext"
import { SubscriptionContext } from "../contexts/SubscriptionContext"
import { ArrowLeft } from "lucide-react"
import { Link } from "react-router-dom"

function CourseCreatorPage() {
  const navigate = useNavigate()
  const [creating, setCreating] = useState(false)
  const [success, setSuccess] = useState(null)
  const [createdCourse, setCreatedCourse] = useState(null)
  const [coverPhotoFile, setCoverPhotoFile] = useState(null)
  const { createCourse } = useContext(CourseContext)
  const { profile } = useContext(ProfileContext)
  const { subscription } = useContext(SubscriptionContext)
  const [errorMessage, setErrorMessage] = useState("")
  
  async function handleCreateClick() {
    if (!profile.phone_number) {
      window.open("/profile/edit/phone", "_blank")
      return
    }

    const courseData = new Object()
    courseData.coverPhotoFile = coverPhotoFile
    courseData.category = localStorage.getItem("course_category_ipt")
    courseData.price = localStorage.getItem("course_price_ipt")
    courseData.title = localStorage.getItem("course_title_ipt")
    courseData.description = localStorage.getItem("course_description_ipt")

    if (subscription.status !== "ACTIVE") {
      setErrorMessage("Veuillez d'abord mettre à jour votre abonnement !")
      return
    }
    if (!courseData.coverPhotoFile) {
      setErrorMessage("Veuillez ajouter une photo de couverture !")
      return
    }
    if (!courseData.category) {
      setErrorMessage("Veuillez séléctioner une catégorie !")
      return
    }
    if (!courseData.price) {
      setErrorMessage("Veuillez entrer le prix !")
      return
    }
    if (!courseData.title) {
      setErrorMessage("Veuillez ajouter un titre !")
      return
    }
    if (!courseData.description) {
      setErrorMessage("Veuillez ajouter une description !")
      return
    }

    setCreating(true)
    console.log("Creating course");
    const result = await createCourse(courseData)
    if (result.error) {
      console.log("Result", result)
      setSuccess(false)
      return
    }
    console.log("Result", result)
    setCreatedCourse(result)
    setSuccess(true)
    setCreating(false)
  }

  function handleUndoClick() {
    localStorage.setItem("course_category_ipt", "")
    localStorage.setItem("course_price_ipt", "")
    localStorage.setItem("course_title_ipt", "")
    localStorage.setItem("course_description_ipt", "")

    navigate("/")
  }

  const handleCloseErrorClick = () => {
    setErrorMessage("")
  }

  window.addEventListener("popstate", handleUndoClick)
  window.addEventListener("unload", handleUndoClick)

  return (
    <>
      <header className="px-5 sticky top-0 py-3 bg-[#800] text-white z-10">
        <div className="font-[500]">
          <Link to={"/"}>
            <ArrowLeft className="inline me-2" />
          </Link>
          Créer un cours
        </div>
      </header>
      {profile.role === "ADMIN" || profile.role === "TEACHER" ? (
        <div className="md:w-2/3 lg:w-1/2 mx-auto">
          <div className="p-5">
            <CoverPhotoUploader onFileReady={file => setCoverPhotoFile(file)} />
            <MetadataForm />
          </div>
          <div className="fixed bottom-0 w-full md:w-2/3 lg:w-1/2 px-4 flex items-center">
            <div className="w-1/2 p-1">
              <Button 
                variant="secondary"
                onClick={handleUndoClick}
              >Annuler</Button>
            </div>
            <div className="w-1/2 p-1">
              <Button onClick={handleCreateClick}>Créer</Button>
            </div>
          </div>
          {creating && (
            <FullScreenLoader title={"Création en cours"} />
          )}
          {success === true && (
            <FullScreenStatus 
              status="success" 
              message={"Cours créé avec succès !"} 
              linkText={"Voir le cours"}
              href={`/courses/${createdCourse.id}`}
            />
          )}
        </div>
      ) : (
        <div className="container mx-auto p-5 flex items-center justify-center">
          <div className="text-zinc-600">Vous n'avez pas la permission à consulter cette page !</div>
        </div>
      )}

      {errorMessage && (
        <div 
          className="fixed top-0 bottom-0 start-0 end-0 flex items-center justify-center z-[9999]"
          style={{
            backdropFilter: "blur(12px)"
          }}
        >
          <div className="w-5/6 md:w-1/2 lg:w-2/5 p-5 bg-white rounded-3xl shadow">
            <div className="font-[400] mb-3">Erreur</div>
            <div className="mb-5">{errorMessage}</div>
            <div className="">
              <Button variant="secondary" onClick={handleCloseErrorClick}>Fermer</Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default CourseCreatorPage
