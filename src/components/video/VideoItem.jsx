import { CirclePlay } from "lucide-react"
import { Link } from "react-router-dom"
import ProfilePicture from "../profile/ProfilePicture"

function VideoItem({ vId="", title="", authorName="", authorPicture, thumbnail, date }) {
  return (
    <div className="p-5">
      <Link to={`/videos/${vId}`}>
        <div className="h-[160pt] bg-zinc-950 rounded relative">
          <div className="absolute top-0 bottom-0 start-0 end-0 flex items-center justify-center text-white -z-0">
            <CirclePlay size={40} />
          </div>
        </div>
      </Link>
      <div className="py-3 flex">
        <div className="w-1/6">
          <ProfilePicture />
        </div>
        <div className="w-5/6 pe-2">
          <div className="font-bold w-full overflow-hidden whitespace-nowrap">{title.substring(0, 38)}</div>
          <div className="flex text-zinc-600 text-sm">
            <div className="me-2">{authorName}</div>
            <div className="me-2">.</div>
            <div>{date}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VideoItem
