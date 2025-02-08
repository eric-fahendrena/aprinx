import Header from "./commons/Header"
import CourseCoverPhoto from "./course/CourseCoverPhoto"
import CourseActionBar from "./course/CourseActionBar"
import CourseMetadata from "./course/CourseMetadata"
import VideoItem from "./video/VideoItem"
import BottomNavbar from "./commons/BottomNavbar"
import { useContext, useEffect, useState } from "react"
import { CourseContext } from "../contexts/CourseContext"
import { useParams } from "react-router-dom"

function CourseDetailPage() {
  const { getCourse } = useContext(CourseContext)
  const params = useParams()
  const [course, setCourse] = useState(null)

  useEffect(() => {
    (async () => {
      const course = await getCourse(params.cId)
      setCourse(course)
    })()
  }, [])

  return (
    <>
      <Header title={"Maitriser Python"} />
      {course && (
        <>
          <CourseCoverPhoto src={course.cover_photo} />
          <div className="container mx-auto pb-[56pt]">
            <CourseActionBar />
            <CourseMetadata 
              category={JSON.parse(course.category).label}
              title={course.title}
              description={course.description}
              authorName={course.author_name}
              authorPicture={course.author_picture}
            />
            <div className="py-5">
              <VideoItem 
                vId="video1"
                title="C'est quoi un langage de programmation ?"
                authorName="Mathieu Nebra"
                date={"Il y a 1 an"}
              />
              <VideoItem 
                vId="video2"
                title="Pourquoi Python ?"
                authorName="Mathieu Nebra"
                date={"Il y a 1 an"}
              />
            </div>
          </div>  
        </>
      )}
      <BottomNavbar />
    </>
  )
}

export default CourseDetailPage
