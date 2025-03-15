import { Upload } from "lucide-react"
import Button from "../commons/Button"
import { useRef, useState } from "react"
import VideoPlayer from "../video/VideoPlayer"

function VideoUploader({ onBack, onFileReady, canNext, onNext }) {
  const fileIpt = useRef()
  const [preview, setPreview] = useState(null)

  const handleVideoChange = (e) => {
    const file = e.target.files[0]
    console.log(URL.createObjectURL(file))
    if (file) {
      setPreview(URL.createObjectURL(file))
      onFileReady(file)
    }
  }

  return (
    <>
      <div className="">
        <div className="container mx-auto">
          <div className="h-[240pt] flex items-center justify-center">
            <div className="w-full p-5">
              <h1 className="font-[500] text-xl text-zinc-600 mb-5">Publier une vidéo éducative</h1>
              <div className="w-full h-[160pt] bg-black rounded-3xl overflow-hidden text-white mb-5 flex items-center justify-center">
                {preview ? (
                  <VideoPlayer src={preview} />
                ) : (
                  <div>
                    <button 
                      className="text-center"
                      onClick={(e) => {
                        fileIpt.current.click()
                      }}
                    >
                      <Upload className="inline me-2" />
                      <span>
                        Téléverser une vidéo
                      </span>
                    </button>
                  </div>
                )}
              </div>
              <div className="">
                <input 
                  type="file" 
                  className="hidden" 
                  ref={fileIpt} 
                  accept="video/*"
                  onChange={handleVideoChange}
                />
                {preview && (
                  <button 
                    className="border p-2 rounded"
                    onClick={(e) => {
                      fileIpt.current.click()
                    }}
                  >
                    <Upload className="inline me-2" />
                    <span>
                      Choisir une autre vidéo
                    </span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 start-0 end-0 py-5">
        <div className="container mx-auto px-4">
          <div className="flex">
          <div className="w-1/2 px-1">
              <Button 
                variant="secondary"
                onClick={onBack}
              >
                Annuler
              </Button>
            </div>
            <div className="w-1/2 px-1">
              <Button disabled={!canNext} onClick={onNext}>
                Suivant
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default VideoUploader
