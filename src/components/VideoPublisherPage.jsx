import Header from "./commons/Header"
import VideoUploader from "./videoPublisher/VideoUploader"
import VideoMetaForm from "./videoPublisher/VideoMetaForm"
import VideoThumbnailUploader from "./videoPublisher/VideoThumbnailUploader"
import { useContext, useState } from "react"
import { useParams } from "react-router-dom"
import { ProfileContext } from "../contexts/ProfileContext"
import { CourseContext } from "../contexts/CourseContext"
import PublishingLoader from "./videoPublisher/PublishingLoader"
import FullScreenStatus from "./commons/FullScreenStatus"

function VideoPublisherPage() {
  const { profile, isLoading, error } = useContext(ProfileContext)
  const { addVideo } = useContext(CourseContext)
  const params = useParams()
  const [success, setSuccess] = useState(null)
  const [publishing, setPublishing] = useState(false)
  const [createdVideo, setCreatedVideo] = useState(null)
  const [step, setStep] = useState("upload")
  const [videoFile, setVideoFile] = useState(null)
  const [metaData, setMetaData] = useState(null)
  const [thumbnailFile, setThumbnailFile] = useState(null)

  if (isLoading) {
    return (
      <div className="absolute top-0 bottom-0 start-0 end-0 flex items-center justify-center">Chargement...</div>
    )
  }

  const sendData = async () => {
    const courseVideoData = new Object()
    courseVideoData.author_id = profile.id
    courseVideoData.course_id = params.cId
    courseVideoData.video_file = videoFile
    courseVideoData.metadata = metaData
    courseVideoData.thumbnail_file = thumbnailFile
    
    setStep("sending")
    setPublishing(true)
    const newVideo = await addVideo(courseVideoData)
    if (newVideo.error) {
      setSuccess(false)
      setPublishing(false)
      return
    }
    setSuccess(true)
    setPublishing(false)
    setCreatedVideo(newVideo)
  }

  return (
    <>
      <Header title={"Publier une vidéo"} backLink={"/"} />
      <div>
        {step === "upload" && (
          <VideoUploader onFileReady={(file) => setVideoFile(file)} canNext={videoFile != null} onNext={() => setStep("meta")} />
        )}
          
        {step === "meta" ? (
          <VideoMetaForm onPrev={() => setStep("upload")} onNext={(data) => {
            setMetaData(data)
            setStep("thumbnail")
          }} />
        ) : ""}
  
        {step === "thumbnail" ? (
          <VideoThumbnailUploader onFileReady={(file) => setThumbnailFile(file)} onPrev={() => setStep("meta")} onNext={sendData} />
        ) : ""}

        {step === "sending" ? (
          <>
            {publishing && (
              <PublishingLoader />
            )}
            {success === true && (
              <FullScreenStatus status="success" message={"Vidéo publiée avec succès"} linkText={"Révenir au cours"} href={`/courses/${createdVideo.course_id}`}  />
            )}
          </>
        ) : ""}
      </div>
    </>
  )
}

export default VideoPublisherPage
