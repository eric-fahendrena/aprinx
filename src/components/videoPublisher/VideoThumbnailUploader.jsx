import React from "react"
import { Upload } from "lucide-react"
import Button from "../commons/Button"

function VideoThumbnailUploader({ onBack, onPublish }) {
  function back() {
    onBack && onBack()
  }

  let postDataStr = localStorage.getItem("post_data")
  let postDataJson = JSON.parse(postDataStr)
  let splitDescription = postDataJson.description.split("\n")

  return (
    <>
      <div className="mb-12">
        <div className="h-[160pt] bg-zinc-600 relative">
          <div className="absolute top-0 bottom-0 start-0 end-0 flex items-center justify-center">
            <div className="text-white text-center px-5">
              <div>Votre publication est presque terminée.</div>
              <div className="font-bold mb-3">Voulez-vous ajouter une miniature à votre vidéo?</div>
              <button className="">
                <Upload className="inline-block mb-2" />
              </button>
              <div>Téléverser une photo</div>
            </div>
          </div>
        </div>
        <div className="container mx-auto">
          <div className="p-5">
            <h4 className="font-bold text-zinc-600 mb-2">{postDataJson.title}</h4>
            <p className="text-lg">
              {splitDescription.map((text, idx) => {
                return (
                  <React.Fragment key={idx}>
                    {text}<br />
                  </React.Fragment>
                )
              })}
            </p>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 start-0 end-0 py-5">
        <div className="container mx-auto px-4">
          <div className="flex">
          <div className="w-1/2 px-1">
              <Button 
                variant="secondary"
                onClick={back}
              >
                Retour
              </Button>
            </div>
            <div className="w-1/2 px-1">
              <Button>
                Publier
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default VideoThumbnailUploader
