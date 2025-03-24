import Header from "./commons/Header"
import Button from "./commons/Button"
import CoverPhotoUploader from "./course/creator/CoverPhotoUploader"
import MetadataForm from "./course/creator/MetadataForm"
import { useNavigate } from "react-router-dom"
import { useContext, useState } from "react"
import { CourseContext } from "../contexts/CourseContext"
import FullScreenLoader from "./commons/FullScreenLoader"
import FullScreenStatus from "./commons/FullScreenStatus"
import { ProfileContext } from "../contexts/ProfileContext"

function CourseCreatorPage() {
  const navigate = useNavigate()
  const [creating, setCreating] = useState(false)
  const [success, setSuccess] = useState(null)
  const [createdCourse, setCreatedCourse] = useState(null)
  const [coverPhotoFile, setCoverPhotoFile] = useState(null)
  const { createCourse } = useContext(CourseContext)
  const { profile } = useContext(ProfileContext)
  
  async function handleCreateClick() {
    const courseData = new Object()
    courseData.coverPhotoFile = coverPhotoFile
    courseData.category = localStorage.getItem("course_category_ipt")
    courseData.price = localStorage.getItem("course_price_ipt")
    courseData.title = localStorage.getItem("course_title_ipt")
    courseData.description = localStorage.getItem("course_description_ipt")

    setCreating(true)
    const result = await createCourse(courseData)
    if (result.error) {
      setSuccess(false)
      return
    }
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

  window.addEventListener("popstate", handleUndoClick)
  window.addEventListener("unload", handleUndoClick)

  return (
    <>
      <Header title={"Créer un cours"} backLink={"/"} />
      {profile.role === "ADMIN" || profile.role === "TEACHER" ? (
        <>
          <div className="container mx-auto p-5">
            <CoverPhotoUploader onFileReady={file => setCoverPhotoFile(file)} />
            <MetadataForm />
          </div>
          <div className="fixed bottom-0 start-0 end-0 px-4 flex items-center">
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
        </>
      ) : (
        <div className="container mx-auto p-5 flex items-center justify-center">
          <div className="text-zinc-600">Vous n'avez pas la permission à consulter cette page !</div>
        </div>
      )}
    </>
  )
}

export default CourseCreatorPage
