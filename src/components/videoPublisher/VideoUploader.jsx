import { Upload } from "lucide-react"
import Button from "../commons/Button"

function VideoUploader({ onBack, onFileReady, canNext, onNext }) {
  return (
    <>
      <div>
        <div className="container mx-auto">
          <div className="h-[240pt] flex items-center justify-center text-center">
            <div className="p-5">
              <h1 className="text-3xl text-zinc-950 font-bold mb-3">Publier une vidéo éducative</h1>
              <div className="py-3">
                <button 
                  className="bg-blue-600 text-white p-5 rounded-full"
                  // this is, for now, just a similation of file ready events
                  onClick={onFileReady}
                >
                  <Upload className="inline-block" />
                </button>
              </div>
              <p className="text-zinc-600">Téléverser une vidéo</p>
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
