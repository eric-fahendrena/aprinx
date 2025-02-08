import { CirclePlay } from "lucide-react"

function VideoPlayer() {
  return (
    <>
      <div className="h-[160pt] bg-zinc-950 relative">
        <div className="absolute top-0 bottom-0 start-0 end-0 flex items-center justify-center text-white -z-0">
          <CirclePlay size={40} />
        </div>
      </div>
    </>
  )
}

export default VideoPlayer
