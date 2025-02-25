import ProfilePicture from "../profile/ProfilePicture"

function CourseMetadata({ title, category, description, authorName, authorPicture }) {
  return (
    <div className="px-5 py-2">
      <div className="border p-5 rounded-3xl">
        <div className="mb-2">
          <div className="inline-flex items-center text-xs mb-2 uppercase text-white bg-red-800 px-5 py-1 rounded-full">{category}</div>
          <div className="font-bold text-xl">{title}</div>
        </div>
        <div className="mb-5">
          {description}
        </div>
        <div className="flex">
          <img src={authorPicture} alt="photo de profile" className="w-[24px] h-[24px] me-3 bg-zinc-700 rounded-full" />
          <div className="">
            <div className="font-[500]">{authorName}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseMetadata
