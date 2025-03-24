import { Link } from "react-router-dom"
import ProfilePicture from "../profile/ProfilePicture"

function CourseItem({ cId="", title="", authorName="", authorPicture, coverPhoto, date, category }) {
  return (
    <div className="px-5 py-2">
      <Link to={`/courses/${cId}`}>
        <div className="h-[160pt] bg-zinc-950 rounded-3xl overflow-hidden relative">
          <div className="w-full h-full object-cover bg-zinc-300"></div>
          {/* <img src={coverPhoto} alt="cover photo" className="w-full h-full object-cover" /> */}
          <div 
            className="absolute top-0 bottom-0 start-0 end-0 flex items-end justify-start p-2 text-white -z-0"
            style={{
              backgroundColor: "#0002",
            }}
          >
            <div className="bg-red-800 text-white px-3 py-2 rounded-full text-xs uppercase">{category}</div>
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
