import { CircleUserRound } from "lucide-react"

function ProfilePicture({ src }) {
  return (
    <div className="w-[32pt] h-[32pt]  rounded-full flex items-center justify-center text-white overflow-hidden">
      {!src ? (
        <CircleUserRound size={"100%"} strokeWidth={1} />
      ) : (
        <img src={src} alt="photo de profile" className="w-full h-full object-cover" />
      )}
    </div>
  )
}

export default ProfilePicture
