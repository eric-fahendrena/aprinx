import Header from "./commons/Header"
import CourseCoverPhoto from "./course/CourseCoverPhoto"
import CourseActionBar from "./course/CourseActionBar"
import CourseMetadata from "./course/CourseMetadata"
import VideoItem from "./video/VideoItem"
import BottomNavbar from "./commons/BottomNavbar"
import { useContext, useEffect, useState } from "react"
import { CourseContext } from "../contexts/CourseContext"
import { useNavigate, useParams } from "react-router-dom"
import { Plus } from "lucide-react"

function CourseDetailPage() {
  const { getCourse, getVideos } = useContext(CourseContext)
  const params = useParams()
  const [course, setCourse] = useState(null)
  const [videos, setVideos] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    (async () => {
      const course = await getCourse(params.cId)
      setCourse(course)
      const videos = await getVideos(course.id)
      setVideos(videos)
    })()
  }, [])

  return (
    <>
      {course && (
        <>
          <Header title={course.title} />
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
              {videos && videos.map((video, idx) => {
                return (
                  <VideoItem 
                    cId={video.course_id}
                    vId={video.id}
                    title={video.title}
                    authorName={video.author_name}
                    authorPicture={video.author_picture}
                    date={video.date}
                    thumbnail={video.thumbnail}
                    key={idx}
                  />
                )
              })}
              <div 
                className="fixed bottom-5 end-5"
                onClick={() => navigate(`/courses/${course.id}/videos/add`)}
              >
                <button className="bg-red-800 text-white px-3 py-2 rounded-full z-50">
                  <Plus className="inline me-1" strokeWidth={3} />
                  <span className="font-bold">
                    Ajouter une vidéo
                  </span>
                </button>
              </div>
            </div>
          </div>  
        </>
      )}
      {/* <BottomNavbar /> */}
    </>
  )
}

export default CourseDetailPage
