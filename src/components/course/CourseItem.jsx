import { Link } from "react-router-dom"
import ProfilePicture from "../profile/ProfilePicture"

function CourseItem({ cId="", title="", authorName="", authorPicture, coverPhoto, date, category }) {
  console.log(coverPhoto)
  return (
    <div className="p-5">
      <Link to={`/courses/${cId}`}>
        <div className="h-[160pt] bg-zinc-950 rounded overflow-hidden relative">
          <img src={coverPhoto} alt="cover photo" className="w-full h-full object-cover" />
          <div 
            className="absolute top-0 bottom-0 start-0 end-0 flex items-end justify-start p-2 text-white -z-0"
            style={{
              backgroundColor: "#0004",
            }}
          >
            <div className="bg-red-800 text-white p-2 rounded text-xs font-bold uppercase">{category}</div>
          </div>
        </div>
      </Link>
      <div className="py-3 flex">
        <div className="w-1/6">
          <ProfilePicture src={authorPicture} />
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

export default CourseItem
