import { ChevronLeft } from "lucide-react"

function Hero() {
  return (
    <div className="bg-[maroon] text-white">
      <div className="p-5 container mx-auto">
        <div className="flex items-center">
          <button>
            <ChevronLeft className="me-1" />
          </button>
          <div className="text-lg">
            Musique
          </div>
        </div>
        <div className="py-5">
          <h1 className="text-3xl">Tojo Guitariste</h1>
        </div>
        <div>
          14 decembre 2024
        </div>
      </div>
    </div>
  )
}

export default Hero
