import { ArrowLeft, Mic } from "lucide-react"
import BottomNavbar from "../commons/BottomNavbar"
import { useContext, useState } from "react"

function SearchField({ onSearch }) {
  const [searchInput, setSearchInput] = useState("")

  const handleSearchKeyUp = async (e) => {
    if (e.key === "Enter") {
      onSearch(searchInput)
    }
  }

  return (
    <>
      <div className="flex items-center">
        {/* <div className="">
          <button>
            <ArrowLeft />
          </button>
        </div> */}
        <div className="w-full">
          <input 
            type="search" 
            placeholder="Rechercher"
            className="w-full bg-zinc-200 focus:bg-zinc-300 outline-none border px-3 py-2 rounded-full"
            value={searchInput}
            onChange={e => setSearchInput(e.target.value)}
            onKeyUp={handleSearchKeyUp}
          />
        </div>
      </div>
      <BottomNavbar current="search" />
    </>
  )
}

export default SearchField
