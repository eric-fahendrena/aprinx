import { ThumbsUp, Share2, MessageCircle } from "lucide-react"
import { useState } from "react"
import BottomSheet from "./BottomSheet"
import CommentItem from "./CommentItem"

function PostActionBar() {
  const [likeActive, setLikeActive] = useState(false)
  const [commentsOpen, setCommentsOpen] = useState(false)

  function like() {
    setLikeActive(!likeActive)
  }

  function openComments() {
    setCommentsOpen(!commentsOpen)
  }
  function closeComments() {
    setCommentsOpen(false)
  }

  return (
    <>
      <div className="p-3 flex items-cetner justify-start bg-white">
        <button 
          className={`${likeActive ? "text-white bg-blue-600" : ""} p-3 rounded-full`}
          onClick={like}
        >
          <div>
            <ThumbsUp className="inline-block" />
          </div>
          <span className="text-xs font-bold">123K</span>
        </button>
        <button 
          className={`p-3`}
          onClick={openComments}
        >
          <div>
            <MessageCircle className="inline-block" />
          </div>
          <span className="text-xs font-bold">123K</span>
        </button>
        <button className="p-3">
          <div>
            <Share2 className="inline-block" />
          </div>
          <span className="text-xs font-bold">12</span>
        </button>
      </div>
      <BottomSheet open={commentsOpen} onClose={closeComments}>
        <div className="text-lg font-bold text-zinc-600 mb-3">Commentaires</div>
        <CommentItem authorName="Tojo Guitariste" date="1h">
          Salama e! Tena mahafinaritra ny fomba fampitanao ilay lesona. Mankasitraka be dia be!
        </CommentItem>
        <CommentItem authorName="Tojo Guitariste" date="1h">
          Salama e! Tena mahafinaritra ny fomba fampitanao ilay lesona. Mankasitraka be dia be!
          Salama e! Tena mahafinaritra ny fomba fampitanao ilay lesona. Mankasitraka be dia be!
          Salama e! Tena mahafinaritra ny fomba fampitanao ilay lesona. Mankasitraka be dia be!
        </CommentItem>
      </BottomSheet>
    </>
  )
}

export default PostActionBar
