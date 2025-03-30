import { Trash2, Heart, MessageSquareText, Share2, SendHorizonal, Link } from "lucide-react"
import { useContext, useEffect, useState } from "react"
import React from "react"
import { ProfileContext } from "../../contexts/ProfileContext"
import { CourseContext } from "../../contexts/CourseContext"
import BottomSheet from "../commons/BottomSheet"
import Textarea from "../commons/Textarea"
import Button from "../commons/Button"
import { CommentContext } from "../../contexts/CommentContext"
import LazyObserver from "../commons/LazyObserver"
import { socket } from "../../services/socketService"
import { DeletedCourseContext } from "../../contexts/DeletedCourseContext"
import { useNavigate } from "react-router-dom"
import dayjs from "dayjs"

function CourseActionBar({ course }) {
  const { profile } = useContext(ProfileContext)
  const { reactCourse, getCourseLike, deleteCourse } = useContext(CourseContext)
  const [liked, setLiked] = useState(false)
  const [commentsBottomSheetOpen, setCommentBottomSheetOpen] = useState(false)
  const [commentInput, setCommentInput] = useState("")
  const [sendingComment, setSendingComment] = useState(false)
  const { createCourseComment, getCourseComments } = useContext(CommentContext)
  const [displayedComments, setDisplayedComments] = useState([])
  const [commentsLoadingEnd, setCommentsLoadingEnd] = useState(false)
  const [commentsCount, setCommentsCount] = useState(0)
  const [likesCount, setLikesCount] = useState(0)
  const [deleteCourseOpen, setDeleteCourseOpen] = useState(false)
  const { createDeletedCourse } = useContext(DeletedCourseContext)
  const [deleting, setDeleting] = useState(false)
  const navigate = useNavigate()
  const [shareOpen, setShareOpen] = useState(false)
  const [linkCopied, setLinkCopied] = useState(false)
  
  const toggleLike = async () => {
    setLiked(true)
    const result = await reactCourse(course.id)
    setLiked(result.liked)
    socket.emit("askCourseLikesCount", course.id)
    if (result.liked && course.author_id !== profile.id) {
      socket.emit("sendNotification", {
        userId: course.author_id,
        courseId: course.id,
        authorNames: `${profile.name}`,
        type: "LIKE",
      })
    }
  }
  
  const handleCommentClick = () => {
    setCommentBottomSheetOpen(true)
  }
  
  const handleCommentBottomSheetClose = () => {
    setCommentBottomSheetOpen(false)
  }
  
  const handleCommentChange = (e) => {
    setCommentInput(e.target.value)
  }
  
  const handleSendCommentClick = async () => {
    setSendingComment(true)
    const createdComment = await createCourseComment(course.id, {
      message: commentInput,
    })
    setSendingComment(false)
    setCommentInput("")
    setDisplayedComments(prev => {
      return [createdComment, ...prev]
    })

    socket.emit("askCourseCommentsNumber", course.id);
    
    if (course.author_id === createdComment.author_id)
      return

    socket.emit("sendNotification", {
      userId: course.author_id,
      courseId: course.id,
      authorNames: `${createdComment.author_name}`,
      type: "COMMENT",
    })
  }
  
  let commentsOffset = 0
  const handleCommentLazyObserverInView = async () => {
    const comments = await getCourseComments(course.id, {
      limit: 10,
      offset: commentsOffset,
    })
    if (comments.length <= 0) {
      setCommentsLoadingEnd(true)
      return
    }
    setDisplayedComments((prevComments) => {
      return [...prevComments].concat(comments)
    })
    commentsOffset += 10
  }

  const handleOpenDeleteClick = () => {
    setDeleteCourseOpen(true)
  }

  const handleUndoDeleteClick = () => {
    setDeleteCourseOpen(false)
  }

  const handleDeleteClick = async () => {
    setDeleting(true)
    const deletedCourse = await deleteCourse(course.id)
    if (deletedCourse) {
      const savedDeletedCourse = await createDeletedCourse(deletedCourse)
      console.log("Saved deleted course :", savedDeletedCourse)
      navigate("/")
    }
    setDeleting(false)
  }

  const handleShareClick = () => {
    setShareOpen(true)
  }
  const handleShareCloseClick = () => {
    setShareOpen(false)
  }
  const handleCopyLinkClick = () => {
    navigator.clipboard.writeText(window.location.href)
      .then(() => {
        console.log("Lien copié")
        setLinkCopied(true)
      })
      .catch((error) => {
        console.error("Erreur de copie", error)
      })
  }

  useEffect(() => {
    socket.emit("askCourseCommentsNumber", course.id);
    socket.emit("askCourseLikesCount", course.id);

    (async () => {
      const like = await getCourseLike(course.id)
      setLiked(like !== null)
    })()

    socket.on("receiveCourseCommentsNumber", (commentsNumber) => {
      setCommentsCount(commentsNumber)
    })
    socket.on("receiveCourseLikesCount", (likesCount) => {
      setLikesCount(likesCount)
    })
  }, [])

  return (
    <>
      {profile && (
        <div className="px-5 py-2">
          <div className="px-5 py-3 shadow rounded-3xl flex items-center justify-around">
            <div className="flex items-center">
              <button onClick={toggleLike} className="me-1">
                <Heart size={20} fill={liked ? "#A00" : "none"} stroke={liked ? "#A00" : "#000"} className="inline-block" />
              </button>
              <div className="text-sm">{likesCount}</div>
            </div>
            <div className="flex items-center">
              <button onClick={handleCommentClick} className="me-1">
                <MessageSquareText size={20} className="inline-block" />
              </button>
              <div className="text-sm">{commentsCount}</div>
            </div>
            <div className="flex items-center">
              <button onClick={handleShareClick}>
                <Share2 size={20} className="inline-block" />
              </button>
            </div>
            {course.author_id === profile.id && (
              <div>
                <button className="text-red-600" onClick={handleOpenDeleteClick}>
                  <Trash2 className="inline-block" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      
      <BottomSheet title={`Commentaires (${commentsCount})`} open={commentsBottomSheetOpen} onClose={handleCommentBottomSheetClose}>
        <div className="fixed top-0 bottom-[80pt] start-0 end-0 px-5 overflow-scroll mt-20 pb-10">
          {displayedComments && displayedComments.map((comment, index) => {
            return (
              <div className="flex mb-3" key={index}>
                <div className="me-2">
                  <img src={comment.author_picture} alt="..." className="w-[24pt] h-[24pt] bg-zinc-300 rounded-full" />
                </div>
                <div className="">
                  <div className="px-5 py-3 bg-zinc-100 rounded-3xl inline-block">
                    <div className="font-[500]">{comment.author_name}</div>
                    <div className="mb-1">{comment.message.split("\n").map((text, idx) => {
                      return (
                        <React.Fragment key={idx}>
                          {text}
                          <br />
                        </React.Fragment>
                      )
                    })}</div>
                    <div className="text-zinc-400 text-xs">{dayjs.unix(parseInt(comment.date) / 1000).fromNow()}</div>
                  </div>
                </div>
              </div>
            )
          })}

          {!commentsLoadingEnd && (
            <LazyObserver onInView={handleCommentLazyObserverInView} />
          )}
        </div>
        
        {profile && (
          <div className="fixed bottom-0 start-0 end-0 bg-white px-5 py-3">
            <div className="mb-2">
              <Textarea 
                placeholder="Commentaire"
                rows={2}
                id="commentInput"
                value={commentInput}
                onChange={handleCommentChange}
              />
            </div>
            <div>
              <Button onClick={handleSendCommentClick}>
                {sendingComment ? "..." : (
                  <>
                    <SendHorizonal className="inline-block me-3" />
                    Envoyer
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </BottomSheet>

      {deleteCourseOpen && (
        <div 
          className="fixed top-0 bottom-0 start-0 end-0 z-[9999] flex items-center justify-center"
          style={{
            backdropFilter: "blur(12px)"
          }}
        >
          <div className="p-5 bg-white rounded-3xl w-5/6 text-center">
            <h3 className="font-[500] mb-5">Supprimer le cours</h3>
            <p className="mb-5 text-[1.2rem]">Voulez-vous vraiment supprimer ce cours ?</p>
            <div className="flex">
              <div className="w-1/2 pe-1">
                <Button variant="secondary" onClick={handleUndoDeleteClick}>Non</Button>
              </div>
              <div className="w-1/2 ps-1">
                <Button onClick={handleDeleteClick}>{deleting ? "..." : "Oui"}</Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {shareOpen && (
        <div 
          className="fixed top-0 bottom-0 start-0 end-0 flex items-center justify-center z-[9999]"
          style={{
            backdropFilter: "blur(12px)"
          }}
        >
          <div className="w-5/6 bg-white p-5 rounded-3xl shadow">
            <div className="font-[500] mb-3">Partager le cours</div>
            <div className="py-5">
              <div className="overflow-scroll bg-zinc-50 text-xs p-2 rounded-3xl mb-3 text-wrap">
                <code className="">{window.location.href}</code>
              </div>
              <button className="px-5 py-1 text-sm bg-white border rounded-3xl" onClick={handleCopyLinkClick}>
                <Link size={16} className="inline me-1 text-zinc-400" />
                {linkCopied ? "Copié" : "Copier le lien"}
              </button>
            </div>
            <div className="">
              <Button variant="secondary" onClick={handleShareCloseClick}>Fermer</Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default CourseActionBar
