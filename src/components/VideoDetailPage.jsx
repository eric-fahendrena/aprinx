import Header from "./commons/Header"
import { Link, useParams } from "react-router-dom"
import VideoPlayer from "./video/VideoPlayer"
import VideoActionBar from "./video/VideoActionBar"
import VideoMetadata from "./video/VideoMetadata"

function VideoDetailPage({ free=false }) {
  const params = useParams()
  const vId = params.vId;

  return (
    <>
      <Header title={"Partie 1 - Maitriser Python"} />
      <VideoPlayer />
      <div className="container mx-auto">
        <VideoActionBar />
      </div>
      <div>
        <VideoMetadata 
          title={"Partie 1 - Maitriser Python"}
          category={"Programmation"}
          description={"Maitriser Python est très facile. Il suffit d'apprendre."}
          authorName={"Mathieu Nebra"}
        />
      </div>
    </>
  )
}

export default VideoDetailPage
