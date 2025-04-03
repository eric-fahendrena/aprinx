import Header from "./commons/Header"
import VideoUploader from "./videoPublisher/VideoUploader"
import VideoMetaForm from "./videoPublisher/VideoMetaForm"
import VideoThumbnailUploader from "./videoPublisher/VideoThumbnailUploader"
import { useContext, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ProfileContext } from "../contexts/ProfileContext"
import { CourseContext } from "../contexts/CourseContext"
import PublishingLoader from "./videoPublisher/PublishingLoader"
import Button from "./commons/Button"
import FullScreenStatus from "./commons/FullScreenStatus"
import { useEffect } from "react"

function VideoPublisherPage() {
  const { profile, isLoading, error } = useContext(ProfileContext)
  const { addVideo, videoUploadProgression } = useContext(CourseContext)
  const params = useParams()
  const navigate = useNavigate()
  const [success, setSuccess] = useState(null)
  const [publishing, setPublishing] = useState(false)
  const [createdVideo, setCreatedVideo] = useState(null)
  const [step, setStep] = useState("upload")
  const [videoFile, setVideoFile] = useState(null)
  const [metaData, setMetaData] = useState(null)
  const [thumbnailFile, setThumbnailFile] = useState(null)
  const [errorMessage, setErrorMessage] = useState("")

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

  const handleVideoUploaderNext = () => {
    const MAX_FILE_SIZE = 1000 * 1000 * 500
    const MAX_FILE_SIZE_MO = MAX_FILE_SIZE / (1000 * 1000)
    if (videoFile.size > MAX_FILE_SIZE) {
      setErrorMessage(`La vidéo est trop lourd ! La taille maximal acceptée est ${MAX_FILE_SIZE_MO}Mo.`)
      return
    }
    setStep("meta")
  }

  const handleCloseErrorClick = () => {
    setErrorMessage("")
  }

  if (isLoading) {
    return (
      <div className="absolute top-0 bottom-0 start-0 end-0 flex items-center justify-center">Chargement...</div>
    )
  }

  return (
    <>
      <Header title={"Publier une vidéo"} backLink={"/"} />
      <div>
        {step === "upload" && (
          <VideoUploader onFileReady={(file) => setVideoFile(file)} canNext={videoFile != null} onNext={handleVideoUploaderNext} onBack={() => navigate("/")} />
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
              <>
                {/* <PublishingLoader /> */}
                <div className="absolute top-0 bottom-0 start-0 end-0 p-5 flex items-center justify-center">
                  <div className="text-center p-5rounded-3xl">
                    <div className="text-xl font-[500] mb-3">Téléchargement du vidéo</div>
                    <p className="text-sm">({`${videoUploadProgression}% téléchargée`})</p>
                    <div className="w-2/3 h-[2pt] bg-zinc-200 inline-block rounded-3xl overflow-hidden">
                      <div className="h-full bg-red-800" style={{ width: `${videoUploadProgression}%` }}></div>
                    </div>
                  </div>
                </div>
              </>
            )}
            {success === true && (
              <FullScreenStatus status="success" message={"Vidéo publiée avec succès"} linkText={"Révenir au cours"} href={`/courses/${createdVideo.course_id}`}  />
            )}
          </>
        ) : ""}
      </div>

      {errorMessage && (
        <div 
          className="fixed top-0 bottom-0 start-0 end-0 flex items-center justify-center z-[9999]"
          style={{
            backdropFilter: "blur(12px)"
          }}
        >
          <div className="w-5/6 p-5 bg-white rounded-3xl shadow">
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

export default VideoPublisherPage
