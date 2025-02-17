import React, { useRef, useState } from "react"
import { Upload } from "lucide-react"
import Button from "../commons/Button"

function VideoThumbnailUploader({ onPrev, onFileReady, onNext }) {
  const fileIpt = useRef()
  const [tnFile, setTnFile] = useState(null)
  const [preview, setPreview] = useState(null)

  const tnFileChangeHandler = (e) => {
    const file = e.target.files[0]
    if (file) {
      setPreview(URL.createObjectURL(file))
      onFileReady && onFileReady(file)
    }
  }
  const next = () => {
    onNext && onNext()
  }

  const prev = () => {
    onPrev && onPrev()
  }

  return (
    <>
      <div className="px-5">
        <p className="mb-5">Votre publication est presque términée. Il reste une tâche à faire.</p>
        <div className="h-[160pt] bg-black text-white rounded flex items-center justify-center mb-3">
          <input type="file" className="hidden" ref={fileIpt} accept="image/*" onChange={tnFileChangeHandler} />
          {preview ? (
            <img src={preview} alt="miniature" className="w-full h-full object-cover" />
          ) : (
            <button 
              className="text-center"
              onClick={() => fileIpt.current.click()}
            >
              <Upload className="inline" /><br />
              <span>Ajouter une miniature</span>
            </button>
          )}
        </div>
        {preview && (
          <button className="px-2 py-2 border rounded" onClick={() => fileIpt.current.click()}><Upload className="inline me-2" />Choisir une autre photo</button>
        )}
      </div>
      <div className="fixed bottom-0 start-0 end-0 py-5">
        <div className="container mx-auto px-4">
          <div className="flex">
          <div className="w-1/2 px-1">
              <Button 
                variant="secondary"
                onClick={prev}
              >
                Retour
              </Button>
            </div>
            <div className="w-1/2 px-1">
              <Button onClick={next}>
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
