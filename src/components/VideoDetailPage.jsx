import { Link, useNavigate, useParams } from "react-router-dom"
import Button from "./commons/Button"
import VideoPlayer from "./video/VideoPlayer"
import { ArrowLeft } from "lucide-react"
import VideoMetadata from "./video/VideoMetadata"
import { useContext, useEffect, useState } from "react"
import { CourseContext } from "../contexts/CourseContext"
import { FadeLoader } from "react-spinners"
import { ProfileContext } from "../contexts/ProfileContext"

function VideoDetailPage() {
  const params = useParams()
  const { profile } = useContext(ProfileContext)
  const { getVideo } = useContext(CourseContext)
  const [video, setVideo] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    (async () => {
      setIsLoading(true)
      const video = await getVideo(params.cId, params.vId)
      setVideo(video)
      setIsLoading(false)
    })()
  }, [])

  return (
    <>
      {!profile && (
        <>
          <header className="px-5 sticky top-0 py-3 bg-[#800] text-white z-10">
            <div className="font-[500]">
              <Link to={`/courses/${params.cId}`}>
                <ArrowLeft className="inline me-2" />
              </Link>
              Vidéo
            </div>
          </header>
          <div className="fixed top-0 bottom-0 start-0 end-0 px-5 flex items-center justify-center">
            <div className="p-5 border rounded-3xl">
              <h1 className="font-[400] text-[1.2rem] mb-3">Accès non authorisée</h1>
              <p className="mb-5">Vous ne pouvez pas regarder la vidéo tant que vous n'êtes pas connecté(e).</p>
              <div className="">
                <Button onClick={() => navigate("/login")}>Se connecter</Button>
              </div>
            </div>
          </div>
        </>
      )}

      {isLoading ? (
        <div className="fixed top-0 bottom-0 start-0 end-0 flex items-center justify-center">
          <div className="text-center">
            <FadeLoader width={5} radius={12} color="#800" margin={0} />
          </div>
        </div>
      ) : (
        <>
          {video && (
            <>
              <header className="px-5 sticky top-0 py-3 bg-[#800] text-white z-10">
                <div className="font-[500]">
                  <Link to={`/courses/${params.cId}`}>
                    <ArrowLeft className="inline me-2" />
                  </Link>
                  {video.title.substring(0, 30)} {video.title.length > 24 && "..."}
                </div>
              </header>
              <VideoPlayer src={video.url} thumbnail={video.thumbnail} />
              <div>
                <VideoMetadata 
                  title={video.title}
                  description={video.description}
                  category={JSON.parse(video.course_category).label}
                  authorName={video.author_name}
                  authorPicture={video.author_picture}
                />
              </div>
            </>
          )}
        </>
      )}
    </>
  )
}

export default VideoDetailPage
