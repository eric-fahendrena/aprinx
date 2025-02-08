import { Image, Upload } from "lucide-react"
import { useRef } from "react"
import { useState } from "react"

function CoverPhotoUploader({ onFileReady }) {
  const [preview, setPreview] = useState(null)
  const fileIpt = useRef()

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result)
      }
      reader.readAsDataURL(file)
      return onFileReady(file)
    }
  }

  return (
    <div className="h-[160pt] relative">
      <div className="h-full flex items-center justify-center rounded border">
        {!preview ? (
          <div className="text-center text-zinc-200">
            <Image size={32} strokeWidth={1} className="inline-block" />
            <div>Photo de couverture</div>
          </div>
        ) : (
          <>
            <img src={preview} alt="..." className="w-full h-full object-cover" />
            <div 
              className="absolute top-0 bottom-0 start-0 end-0"
            ></div>
          </>
        )}
      </div>
      <div className="absolute top-0 bottom-0 start-0 end-0 p-3 flex items-end justify-start">
        <input 
          type="file" 
          onChange={handleFileChange} 
          className="hidden" 
          ref={fileIpt} 
          accept="image/*"
        />
        <button 
          className="text-zinc-600 bg-white p-1 rounded flex items-center"
          onClick={e => fileIpt.current.click()}
        >
          <Upload size={16} className="me-1" /> Choisir une image
        </button>
      </div>
    </div>
  )
}

export default CoverPhotoUploader
