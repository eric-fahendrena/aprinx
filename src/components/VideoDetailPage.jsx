import Header from "./commons/Header"
import { Link, useParams } from "react-router-dom"
import VideoPlayer from "./video/VideoPlayer"
import VideoActionBar from "./video/VideoActionBar"
import VideoMetadata from "./video/VideoMetadata"
import { useContext, useEffect, useState } from "react"
import { CourseContext } from "../contexts/CourseContext"

function VideoDetailPage() {
  const params = useParams()
  const { getVideo } = useContext(CourseContext)
  const [video, setVideo] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

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
      <Header title={"Partie 1 - Maitriser Python"} />
      {video && (
        <>
          <VideoPlayer src={video.url} thumbnail={video.thumbnail} />
          <div className="container mx-auto">
            <VideoActionBar />
          </div>
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
  )
}

export default VideoDetailPage
