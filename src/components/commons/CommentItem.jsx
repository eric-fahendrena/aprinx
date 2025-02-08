import { CircleUserRound } from "lucide-react"
import { Link } from "react-router-dom"

function CommentItem({ children, profilePicture, authorName="", date="", commentId="" }) {
  return (
    <div className="flex py-3">
      <div className="w-2/12">
        <div className="w-[32pt] h-[32pt] rounded-full flex items-center justify-center bg-zinc-600 text-white">
          <CircleUserRound size={"100%"} strokeWidth={1} />
        </div>
      </div>
      <div className="w-10/12">
        <div className="flex justify-between">
          <div className="font-bold">{authorName}</div>
          <div className="text-zinc-600">{date}</div>
        </div>
        <div>
          {children.toString().substring(0, 120)}
          {children.length > 120 && (
            <span className="text-zinc-600">...</span>
          )}
        </div>
        <div className="flex">
          <button className="text-blue-600 font-bold">Répondre</button>
        </div>
      </div>
    </div>
  )
}

export default CommentItem
