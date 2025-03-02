import { Trash2, Heart, MessageSquareText, Share2 } from "lucide-react"
import { useContext, useEffect, useState } from "react"
import { ProfileContext } from "../../contexts/ProfileContext"
import { CourseContext } from "../../contexts/CourseContext"

function CourseActionBar({ course }) {
  const { profile } = useContext(ProfileContext)
  const { reactCourse, courseLiked } = useContext(CourseContext)
  const [liked, setLiked] = useState(false)

  const toggleLike = async () => {
    setLiked(true)
    const result = await reactCourse(course.id)
    setLiked(result.liked)
  }

  useEffect(() => {
    (async () => {
      const liked = await courseLiked(course.id)
      console.log("Liked")
      console.log(liked)
      setLiked(liked)
    })()
  }, [])

  return (
    <div className="">
      <div className="px-5 py-3 flex items-center justify-around">
        <div className="me-5 text-center">
          <button onClick={toggleLike}>
            <Heart fill={liked ? "#800" : "none"} stroke={liked ? "#800" : "#000"} className="inline-block" />
          </button>
          <div className="text-sm">123</div>
        </div>
        <div className="me-5 text-center">
          <button>
            <MessageSquareText className="inline-block" />
          </button>
          <div className="text-sm">0</div>
        </div>
        <div className="me-5 text-center">
          <button>
            <Share2 className="inline-block" />
          </button>
          <div>0</div>
        </div>
        {course.author_id === profile.id && (
          <div>
            <button className="text-red-600">
              <Trash2 className="inline-block" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default CourseActionBar
