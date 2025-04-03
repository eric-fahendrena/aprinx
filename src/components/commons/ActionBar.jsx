import { Heart, MessageCircle, Share2 } from "lucide-react"
import { useState } from "react"

function ActionBar({ onLike }) {
  const [likeActive, setLikeActive] = useState(false)

  function like() {
    setLikeActive(!likeActive)
    if (onLike) onLike(!likeActive)
  }

  return (
    <div className="h-[40pt] px-5 bg-white flex items-center justify-between">
      <div>
        <button 
          className={`inline-flex items-center ${likeActive && "bg-red-800 text-white"} rounded-full px-3 py-2`}
          onClick={like}
        >
          <Heart 
            className="me-1" 
            stroke={likeActive ? "none" : "currentColor"} 
            fill={likeActive ? "currentColor" : "none"}
          />
          <span className="hidden">J'aime</span>
          <span className="text-sm font-bold">1M</span>
        </button>

        <button 
          className={`inline-flex items-center rounded-full px-3 py-2`}
        >
          <MessageCircle className="me-1" />
          <span className="hidden">Commentaires</span>
          <span className="text-sm font-bold">124K</span>
        </button>
      </div>

      <button 
        className={`flex items-center rounded-full px-3 py-2`}
      >
        <Share2 className="me-1" />
        <span className="hidden">Partager</span>
      </button>
    </div>
  )
}

export default ActionBar
