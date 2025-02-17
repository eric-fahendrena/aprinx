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
      <div className="h-[160pt] bg-zinc-950 relative" ref={container}>
        {/* <video 
          src={src} 
          className="w-full h-full"
          controls
        ></video> */}
      </div>
    </>
  )
}

export default VideoPlayer
