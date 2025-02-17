import Header from "./commons/Header"
import VideoUploader from "./videoPublisher/VideoUploader"
import PostMetaForm from "./videoPublisher/PostMetaForm"
import VideoThumbnailUploader from "./videoPublisher/VideoThumbnailUploader"
import { useContext, useState } from "react"
import { useParams } from "react-router-dom"
import { ProfileContext } from "../contexts/ProfileContext"
import { CourseContext } from "../contexts/CourseContext"
import PublishingLoader from "./videoPublisher/PublishingLoader"

function VideoPublisherPage() {
  const { profile, isLoading, error } = useContext(ProfileContext)
  const { addVideo } = useContext(CourseContext)
  const params = useParams()
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
    const newVideo = await addVideo(courseVideoData)
  }

  return (
    <>
      <Header title={"Publier une vidéo"} backLink={"/"} />
      <div>
        {step === "upload" && (
          <VideoUploader onFileReady={(file) => setVideoFile(file)} canNext={videoFile != null} onNext={() => setStep("meta")} />
        )}
          
        {step === "meta" ? (
          <PostMetaForm onPrev={() => setStep("upload")} onNext={(data) => {
            setMetaData(data)
            setStep("thumbnail")
          }} />
        ) : ""}
  
        {step === "thumbnail" ? (
          <VideoThumbnailUploader onFileReady={(file) => setThumbnailFile(file)} onPrev={() => setStep("meta")} onNext={sendData} />
        ) : ""}

        {step === "sending" ? (
          <PublishingLoader />
        ) : ""}
      </div>
    </>
  )
}

export default VideoPublisherPage
