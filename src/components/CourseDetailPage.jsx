import Header from "./commons/Header"
import Button from "./commons/Button"
import BottomSheet from "./commons/BottomSheet"
import CourseCoverPhoto from "./course/CourseCoverPhoto"
import CourseActionBar from "./course/CourseActionBar"
import CourseMetadata from "./course/CourseMetadata"
import VideoItem from "./video/VideoItem"
import { useContext, useEffect, useState } from "react"
import { CourseContext } from "../contexts/CourseContext"
import { useNavigate, useParams } from "react-router-dom"
import { Plus } from "lucide-react"
import { ProfileContext } from "../contexts/ProfileContext"
import { ShoppingCart, ArrowRightLeft  } from "lucide-react"
import CoursePaymentForm from "./course/CoursePaymentForm"

function CourseDetailPage() {
  const { getCourse, getVideos } = useContext(CourseContext)
  const { profile } = useContext(ProfileContext)
  const params = useParams()
  const [course, setCourse] = useState(null)
  const [videos, setVideos] = useState(null)
  const navigate = useNavigate()
  const [paymentFormOpen, setPaymentFormOpen] = useState(false)
  const [openTransManager, setOpenTransManager] = useState(false)

  const openPaymentForm = () => {
    setPaymentFormOpen(true)
  }

  useEffect(() => {
    // get course and its videos
    (async () => {
      const course = await getCourse(params.cId)
      const videos = await getVideos(course.id)
      setCourse(course)
      setVideos(videos)
    })()
  }, [])

  return (
    <>
      {course && (
        <>
          <Header title={course.title} backLink={"/"} />
          <CourseCoverPhoto src={course.cover_photo} />
          <div className="container mx-auto pb-[56pt]">
            {/* <CourseActionBar /> */}
            {course.author_id !== profile.id ? (
              <div className="p-5">
                <Button onClick={openPaymentForm}>
                  <ShoppingCart strokeWidth={2} className="inline-block me-2" /> 
                  Acheter le cours
                </Button>
              </div>
            ) : (
              <div className="p-5">
                <Button variant="secondary" onClick={() => setOpenTransManager(true)}>
                  <ArrowRightLeft strokeWidth={2.5} className="inline-block me-2" />
                  Gérer les transactions
                </Button>
              </div>
            )}
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
              {(profile && profile.id === course.author_id) && (
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
              )}
            </div>
          </div>  
          
          <CoursePaymentForm 
            courseId={course.id}
            price={course.price}
            phoneNumber={course.author_phone_number}
            phoneAssociatedName={course.author_number_associated_name}
            open={paymentFormOpen}
            onClose={() => setPaymentFormOpen(false)}
          />
        </>
      )}
    </>
  )
}

export default CourseDetailPage
