import { Link } from "react-router-dom"
import { Play, CirclePlay } from "lucide-react"

function Post({ link, vId="" }) {
  let free = false
  let title = "Embona sy hanina"
  let description = "Lorem, ipsum dolor sit amet consectetur adipisicing elit."
  let authorName = "Tojo Guitariste"

  return (
    <div>
      <div className="p-5">
        <Link to={link}>
          <div className="p-3 border rounded-md">
            <div className="w-full h-[160pt] bg-zinc-950 rounded relative">
              <div className="absolute top-0 bottom-0 start-0 end-0 flex items-center justify-center text-white -z-0">
                <CirclePlay size={40} />
              </div>
            </div>
            <div className="">
              <div className="font-bold pt-5">{title}</div>
              <div className="py-2">{description.substring(0, 125)}</div>
              <div className="text-blue-400 font-bold">{authorName}</div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default Post
