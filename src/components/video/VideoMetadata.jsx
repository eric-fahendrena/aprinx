import ProfilePicture from "../profile/ProfilePicture"

function VideoMetadata({ title, category, description, authorName }) {
  return (
    <div className="px-5 py-2">
      <div className="mb-2">
        <div className="inline-flex items-center text-xs mb-2 uppercase text-white bg-red-800 font-bold px-2 py-1 rounded">{category}</div>
        <div className="font-bold text-xl">{title}</div>
      </div>
      <div className="mb-5">
        {description}
      </div>
      <div className="flex">
        <div className="w-1/6">
          <ProfilePicture />
        </div>
        <div className="w-5/6">
          <div className="font-bold">{authorName}</div>
        </div>
      </div>
    </div>
  )
}

export default VideoMetadata
