import DPlayer from "dplayer"
import { useEffect, useRef } from "react"

function VideoPlayer({ src, thumbnail }) {
  const container = useRef()

  useEffect(() => {
    const dp = new DPlayer({
      container: container.current,
      screenshot: true,
      video: {
        url: src,
        pic: thumbnail,
        thumbnails: thumbnail,
      },
    })
  }, [])
  return (
    <>
      <div className="h-[160pt] md:h-[240pt] lg:h-[320pt] bg-zinc-950 relative" ref={container}>
        
      </div>
    </>
  )
}

export default VideoPlayer
