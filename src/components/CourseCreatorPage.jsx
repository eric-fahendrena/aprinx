import Header from "./commons/Header"
import Button from "./commons/Button"
import CoverPhotoUploader from "./course/creator/CoverPhotoUploader"
import MetadataForm from "./course/creator/MetadataForm"
import { useNavigate } from "react-router-dom"
import { useContext, useState } from "react"
import { CourseContext } from "../contexts/CourseContext"

function CourseCreatorPage() {
  const navigate = useNavigate()
  const [coverPhotoFile, setCoverPhotoFile] = useState(null)
  const { createCourse } = useContext(CourseContext)
  
  function create() {
    const courseData = new Object()
    courseData.coverPhotoFile = coverPhotoFile
    courseData.category = localStorage.getItem("course_category_ipt")
    courseData.title = localStorage.getItem("course_title_ipt")
    courseData.description = localStorage.getItem("course_description_ipt")

    createCourse(courseData)
  }

  function undo() {
    localStorage.setItem("course_category_ipt", "")
    localStorage.setItem("course_title_ipt", "")
    localStorage.setItem("course_description_ipt", "")

    navigate("/")
  }

  window.addEventListener("popstate", undo)
  window.addEventListener("unload", undo)

  return (
    <>
      <Header title={"Créer un cours"} backLink={"/"} />
      <div className="container mx-auto p-5">
        <CoverPhotoUploader onFileReady={file => setCoverPhotoFile(file)} />
        <MetadataForm />
      </div>
      <div className="fixed bottom-0 start-0 end-0 px-4 flex items-center">
        <div className="w-1/2 p-1">
          <Button 
            variant="secondary"
            onClick={undo}
          >
            Annuler
          </Button>
        </div>
        <div className="w-1/2 p-1">
          <Button
            onClick={create}
          >
            Créer
          </Button>
        </div>
      </div>
    </>
  )
}

export default CourseCreatorPage
