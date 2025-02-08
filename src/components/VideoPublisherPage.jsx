import Header from "./commons/Header"
import VideoUploader from "./videoPublisher/VideoUploader"
import PostMetaForm from "./videoPublisher/PostMetaForm"
import VideoThumbnailUploader from "./videoPublisher/VideoThumbnailUploader"
import { useState } from "react"

function VideoPublisherPage() {
  const [step, setStep] = useState("upload")
  const [fileReady, setFileReady] = useState(false)

  return (
    <>
      <Header title={"Publier une vidéo"} backLink={"/"} />
      <div>
        {step === "upload" ? (
          <VideoUploader onFileReady={() => setFileReady(true)} canNext={fileReady} onNext={() => setStep("meta")} />
        ) : ""}
        
        {step === "meta" ? (
          <PostMetaForm onPrev={() => setStep("upload")} onNext={() => setStep("thumbnail")} />
        ) : ""}

        {step === "thumbnail" ? (
          <VideoThumbnailUploader onBack={() => setStep("meta")} />
        ) : ""}
      </div>
    </>
  )
}

export default VideoPublisherPage
