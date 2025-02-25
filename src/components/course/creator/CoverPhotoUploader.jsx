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
    <div className="h-[56pt] relative">
      <div className="h-full flex items-stretch">
        {!preview ? (
          <div className="w-1/3 rounded border flex items-center justify-center text-zinc-200">
            <Image size={32} strokeWidth={1} className="inline-block" />
            {/* <div>Photo de couverture</div> */}
          </div>
        ) : (
          <>
            <img src={preview} alt="..." className="w-1/3 h-full object-cover" />
            <div 
              className="absolute top-0 bottom-0 start-0 end-0"
            ></div>
          </>
        )}
        <div className="w-2/3">
          <input 
            type="file" 
            onChange={handleFileChange} 
            className="hidden" 
            ref={fileIpt} 
            accept="image/*"
          />
          <button 
            className="text-zinc-600 text-start text-sm bg-white ps-5 rounded"
            onClick={e => fileIpt.current.click()}
          >
            <Upload size={24} className="mb-1" /> Choisir une photo de couverture
          </button>
        </div>
      </div>
    </div>
  )
}

export default CoverPhotoUploader
