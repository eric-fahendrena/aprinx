import { Link } from "react-router-dom"
import { ArrowLeft, VenetianMask } from "lucide-react"
import LazyObserver from "./commons/LazyObserver"
import React, { useContext, useState } from "react"
import { FeedbackContext } from "../contexts/FeedbackContext"
import dayjs from "dayjs"

function FeedbackListPage() {
  const { 
    getAllFeedbacks, 
    feedbacks, 
    setFeedbacks, 
    loadingFeedbacks, 
    setLoadingFeedbacks,
    feedbacksOffset,
    setFeedbacksOffset,
  } = useContext(FeedbackContext)
  let offset = feedbacksOffset
  let limit = 10

  const handleObserverInView = async () => {
    console.log("Loading feedbacks...")
    const feedbacks = await getAllFeedbacks(offset, limit)
    console.log("feedbacks :", feedbacks)
    
    setFeedbacks(prev => {
      return [...prev].concat(feedbacks)
    })

    if (feedbacks.length < limit) {
      setLoadingFeedbacks(false)
      return
    }

    offset += limit
    setFeedbacksOffset(offset)
  }

  return (
    <>
      <header className="px-5 md:mx-40 lg:mx-60 sticky top-0 py-3 bg-[#800] text-white z-10">
        <div className="font-[500]">
          <Link to={"/"}>
            <ArrowLeft className="inline me-2" />
          </Link>
          Avis des utilisateurs
        </div>
      </header>
      <div className="container mx-auto p-5">
        {feedbacks.map((feedback, idx) => {
          return (
            <div className="flex mb-5" key={idx}>
              <div className="pe-3">
                {feedback.author_picture ? (
                  <div className="w-[32px] h-[32px] rounded-full bg-zinc-100 overflow-hidden">
                    <img src={feedback.author_picture} alt="..." className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="w-[32px] h-[32px] rounded-full bg-zinc-900 text-white flex items-center justify-center">
                    <VenetianMask size={20} />
                  </div>
                )}
              </div>
              <div className="w-5/6">
                <div className="">
                  <div className="font-[500]">{feedback.author_name ? feedback.author_name : "Anonyme"}</div>
                  <p>{feedback.message.split('\n').map((text, idx) => {
                    return (
                      <React.Fragment key={idx}>
                        {text}
                        <br />
                      </React.Fragment>
                    )
                  })}</p>
                  <div className="text-xs text-zinc-400">{dayjs.unix(parseInt(feedback.date) / 1000).fromNow()}</div>
                </div>
              </div>
            </div>
          )
        })}

        {loadingFeedbacks && (
          <div className="p-5">
            <LazyObserver onInView={handleObserverInView} />
          </div>
        )}
      </div>
    </>
  )
}

export default FeedbackListPage
