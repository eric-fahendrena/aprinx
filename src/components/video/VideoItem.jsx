import { CirclePlay } from "lucide-react"
import { Link } from "react-router-dom"
import { ShoppingCart } from "lucide-react"
import dayjs from "dayjs"

function VideoItem({ vId="", cId="", title="", authorName="", isAccessible, authorPicture, thumbnail, date, onClick }) {
  return (
    <div className="p-5">
      <Link to={!isAccessible ? "" : `/courses/${cId}/videos/${vId}`} onClick={onClick && onClick}>
        <div className="h-[160pt] relative">
          {thumbnail && (
            <img src={thumbnail} alt={title} className="w-full h-full object-cover rounded-3xl" />
          )}
          <div className="absolute top-0 bottom-0 start-0 end-0 rounded-3xl overflow-hidden flex items-center justify-center text-white -z-0" style={{
            backgroundColor: "#0002"
          }}>
            {!isAccessible ? (
              <>
                <ShoppingCart className="me-2" />
                <span>Acheter le cours</span>
              </>
            ) : (
              <CirclePlay size={40} />
            )}
          </div>
        </div>
      </Link>
      <div className="py-3 flex">
        <div className="w-1/6 flex items-center">
          <img src={authorPicture} alt="..." className="w-[32pt] h-[32pt] rounded-full" />
        </div>
        <div className="w-5/6 pe-2">
          <div className="font-bold w-full overflow-hidden whitespace-nowrap">{title.substring(0, 38)}</div>
          <div className="flex text-zinc-600 text-sm">
            <div className="me-2">{authorName}</div>
            <div className="me-2">.</div>
            <div>{dayjs.unix(parseInt(date) / 1000).fromNow()}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VideoItem
