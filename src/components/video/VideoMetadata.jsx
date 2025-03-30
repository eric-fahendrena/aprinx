import React from "react"

function VideoMetadata({ title, category, description, authorName, authorPicture }) {
  return (
    <div className="px-5 py-5">
      <div className="p-5 border rounded-3xl">
        <div className="mb-2">
          <div className="inline-block text-xs mb-2 uppercase text-white bg-red-800 px-3 py-1 rounded-3xl">{category}</div>
          <div className="font-[500] text-xl">{title}</div>
        </div>
        <div className="mb-5">
          {description.split("\n").map((text, idx) => {
            return (
              <React.Fragment key={idx}>
                {text}
                <br />
              </React.Fragment>
            )
          })}
        </div>
        <div className="flex items-center">
          <div className="w-[24px] h-[24px] me-2 rounded-full bg-zinc-200 overflow-hidden">
            <img src={authorPicture} alt="Photo de profile" className="w-full h-full object-cover" />
          </div>
          <div className="font-[500]">{authorName}</div>
        </div>
      </div>
    </div>
  )
}

export default VideoMetadata
