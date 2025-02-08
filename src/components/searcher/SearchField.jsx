import { ArrowLeft, Mic } from "lucide-react"
import BottomNavbar from "../commons/BottomNavbar"

function SearchField() {
  return (
    <>
      <div className="flex items-center">
        <div className="w-[32pt]">
          <button>
            <ArrowLeft />
          </button>
        </div>
        <div className="w-full flex items-center justify-center">
          <input 
            type="search" 
            placeholder="Rechercher"
            className="w-5/6 bg-zinc-200 focus:bg-zinc-300 outline-none border px-3 py-2 rounded-full"
          />
          <div className="w-1/6 flex justify-center">
            <button className="bg-zinc-200 p-2 rounded-full">
              <Mic />
            </button>
          </div>
        </div>
      </div>
      <BottomNavbar current="search" />
    </>
  )
}

export default SearchField
